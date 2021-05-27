package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandleGetShopDetail(message map[string]interface{}) map[string]interface{} {
	return db.GetShop(message["shop_id"].(string), false)
}
