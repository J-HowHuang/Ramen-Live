package db

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func Register(newUser map[string]interface{}) map[string]interface{} {
	users := db.Database("RamenDB").Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if users.FindOne(ctx, bson.D{{"uid", newUser["uid"]}}).Err() != mongo.ErrNoDocuments {
		// handle registered user
	}

	_, err := users.InsertOne(ctx, newUser)
	if err != nil {
		// handle errors
	}
	ret := make(map[string]interface{})
	ret["status"] = "logged in"
	ret["user_info"] = newUser

	return ret
}

func Login(userId string) map[string]interface{} {
	users := db.Database("RamenDB").Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	ret := make(map[string]interface{})

	// log the login info
	finding := users.FindOne(ctx, bson.D{{"uid", userId}})
	if finding.Err() == mongo.ErrNoDocuments {
		ret["status"] = "not registered"
		user := make(map[string]interface{})

		ret["user_info"] = user

	} else {
		ret["status"] = "logged in"
		var userInfo map[string]interface{}
		finding.Decode(&userInfo)

		ret["user_info"] = userInfo
	}
	return ret
}

func LineLogin(accessToken string) map[string]interface{} {
	ret := make(map[string]interface{})
	if !verifyAccessToken(accessToken) {
		// handle invalid access token
	}
	res := getRequest("https://api.line.me/v2/profile",
		map[string]string{},
		map[string]string{"Authorization": "Bearer " + accessToken})
	login_resp := Login(res["userId"].(string))
	if login_resp["status"] == "not registered" {
		user := make(map[string]interface{})
		user["uid"] = res["userId"].(string)
		user["lineName"] = res["displayName"].(string)
		user["lineAvatarURL"] = res["pictureUrl"].(string)

		Register(user)

		ret["status"] = "new user"
		ret["user_info"] = user
	} else {
		ret["status"] = "logged in"
		ret["user_info"] = login_resp["user_info"]
	}
	return ret
}

func verifyAccessToken(accessToken string) bool {
	res := getRequest("https://api.line.me/oauth2/v2.1/verify",
		map[string]string{"access_token": accessToken},
		map[string]string{})
	channel_id := os.Getenv("CHANNEL_ID")
	if res["client_id"].(string) == channel_id && res["expires_in"].(float64) > 0 {
		return true
	} else {
		return false
	}
}

func getRequest(url string,
	queries map[string]string,
	headers map[string]string) map[string]interface{} {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	q := req.URL.Query()
	for k, v := range queries {
		q.Add(k, v)
	}
	req.URL.RawQuery = q.Encode()

	for k, v := range headers {
		req.Header.Add(k, v)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		//handle error
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		// handle error
	}
	var res map[string]interface{}
	json.Unmarshal(body, &res)

	return res
}
