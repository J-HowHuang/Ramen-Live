package api

import (
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func HandleGetPosts(message map[string]interface{}) map[string]interface{} {
	ret := make(map[string]interface{})
	var posts []map[string]interface{}
	if postsId, ok := message["posts"].([]interface{}); ok {
		for _, id := range postsId {
			post := db.GetPost(id.(primitive.ObjectID))
			posts = append(posts, post["post_info"].(map[string]interface{}))
		}
		ret["status"] = "success"
		ret["posts"] = posts
		return ret
	} else {
		return formatError()
	}
}
