package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandleCreateShop(message map[string]interface{}) map[string]interface{} {
	return db.CreateShop(message["new_shop"].(map[string]interface{}))
}
