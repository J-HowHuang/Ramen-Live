package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func validPost(post map[string]interface{}) bool {
	required := []string{
		"author",
		"postTime",
		"report",
	}
	for _, f := range required {
		if _, ok := post[f]; !ok {
			return false
		}
	}
	return true
}

func createPost(newPost map[string]interface{}) map[string]interface{} {
	ret := make(map[string]interface{})
	posts := db.Database("RamenDB").Collection("posts")
	if !validPost(newPost) {
		ret["status"] = "error"
		ret["message"] = "Missing data in required field"
		return ret
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := posts.InsertOne(ctx, newPost)
	if err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
	} else {
		ret["status"] = "success"
		ret["post_id"] = res.InsertedID
	}

	return ret
}

func GetPost(postId interface{}) map[string]interface{} {
	posts := db.Database("RamenDB").Collection("posts")
	ret := make(map[string]interface{})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	res := posts.FindOne(ctx, bson.D{{"_id", postId}})
	if res.Err() != nil {
		ret["status"] = "error"
		ret["message"] = res.Err().Error()
		return ret
	}
	var postInfo map[string]interface{}
	res.Decode(&postInfo)

	ret["status"] = "success"
	ret["post_info"] = postInfo
	return ret
}
