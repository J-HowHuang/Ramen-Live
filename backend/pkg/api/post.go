package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandlePost(message map[string]interface{}) map[string]interface{} {
	post := message["new_post"]
	shopId := message["shop_id"]
	return db.PostAtShop(post.(map[string]interface{}), shopId.(string))
}
