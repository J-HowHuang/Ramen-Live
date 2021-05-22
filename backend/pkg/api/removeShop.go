package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandleRemoveShop(message map[string]interface{}) map[string]interface{} {
	return db.RemoveShop(message["shop_id"].(string))
}
