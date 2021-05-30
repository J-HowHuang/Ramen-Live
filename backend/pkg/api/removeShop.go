package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandleRemoveShop(message map[string]interface{}) map[string]interface{} {
	if shopId, ok := message["shop_id"].(string); ok {
		return db.RemoveShop(shopId)
	} else {
		return formatError()
	}
}
