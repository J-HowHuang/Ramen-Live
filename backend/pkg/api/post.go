package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandlePost(message map[string]interface{}) map[string]interface{} {
	post, ok1 := message["new_post"]
	shopId, ok2 := message["shop_id"]
	if ok1 && ok2 {
		return db.PostAtShop(post.(map[string]interface{}), shopId.(string))
	} else {
		return formatError()
	}
}
