package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandleGetShopDetail(message map[string]interface{}) map[string]interface{} {
	if shopId, ok := message["shop_id"].(string); ok {
		return db.GetShop(shopId, false)
	} else {
		return formatError()
	}
}
