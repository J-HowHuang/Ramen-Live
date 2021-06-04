package api

import (
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

func HandleGetPosts(message map[string]interface{}) map[string]interface{} {
	ret := make(map[string]interface{})
	var posts []map[string]interface{}
	if postsId, ok := message["posts"].([]interface{}); ok {
		for _, id := range postsId {
			id, ok := id.(string)
			if !ok {
				continue
			}
			post := db.GetPost(id)
			if post["post_info"] != nil {
				posts = append(posts, post["post_info"].(map[string]interface{}))
			} else {
				err := make(map[string]interface{})
				err["report"] = "post " + id + " not found"
				posts = append(posts, err)
			}
		}
		ret["status"] = "success"
		ret["posts"] = posts
		return ret
	} else {
		return formatError()
	}
}
