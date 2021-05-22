package api

import (
	"fmt"

	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

/*
User verification is done by Line API.
Frontend has to acquire access token from LINE SDK, then send it as an identifier of user.

Login:

frontend	 	-> { type, uid, access_token }                             -> backend
		- type: "line", "other"
		- uid: provide the user id if the type is specified "other"
		- access_token: provide the access token yield from LINE SDK if the type is specified "line"


Backend cget user information from LINE Platform using the access token.

backend  	  	-> { access_token }									-> LINE Platform 	(HTTP)
Line Platform 	-> 200 OK { client_id, expires_in }					-> backend			(HTTP)


Bankend then check if client_id == LINE Login channel ID && expires_in > 0
If so,

backend		 	-> {  }



backend  -> { status, user_info, homepageshoplist([]shopid) } -> frontend
		- status: "new user" or "logged in"
		- user_info: {
			Uid            string   // LINE 的 uid
			LineName       string   // LINE 的顯示名稱
			LineAvatarURL  string   // LINE 頭像 url
			DisplayName    string   // 暱稱
			AvatarURL      string   // 自訂頭像 url
			Email          string   // Email address
			FavoriteStores []string // store _id
			// ... Something about user ranking
		}
*/

func HandleLogin(message map[string]interface{}) map[string]interface{} {
	// userinformation:= make(map[string]interface{})

	resp := make(map[string]interface{})
	if message["type"] == "line" {
		resp = db.LineLogin((message["access_token"].(string)))
	} else {
		resp = db.Login(message["uid"].(string))
	}

	if resp["status"] == "new user" {
		fmt.Println("new user!")
		fmt.Print(resp["user_info"])
	} else if resp["status"] == "logged in" {
		fmt.Println("logged in!")
		fmt.Print(resp["user_info"])
	}

	return resp
}
