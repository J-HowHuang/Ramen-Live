package api

import (
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

/*
User verification is done by Line API
Frontend has to acquire access token from LINE SDK, then send it as an identifier of user.

Login:

frontend -> { new_user }                                     -> backend

backend  -> { status, user_info, homepageshoplist([]shopid) } -> frontend
		- status: "not registered" or "logged in"
		- userinformation: {
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

func HandleRegister(message map[string]interface{}) map[string]interface{} {
	newUser := message["new_user"].(map[string]interface{})
	res := db.Register(newUser)

	return res
}
