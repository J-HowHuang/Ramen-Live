package api

import (
	"log"
)

func HandleGetRamenShopDetail(message map[string]interface{}) {
	log.Println(message["shopid"])
}