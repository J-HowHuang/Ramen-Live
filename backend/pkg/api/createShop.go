package api

import (
	"log"

	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

func HandleCreateShop(message map[string]interface{}) map[string]interface{} {
	if newShop, ok := message["new_shop"].(map[string]interface{}); ok {
		return db.CreateShop(newShop)
	} else {
		log.Default().Print(newShop)
		return formatError()
	}
}
