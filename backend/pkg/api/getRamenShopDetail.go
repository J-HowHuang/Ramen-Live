package api

import (
	"log"
)

// GetRamenShopDetail:

// frontend -> { shopid } 		-> backend

// backend ->  { shopdetail } 	-> frontend
// 		- shopdetail: { shopposts([]shoppost) } 
//			- shoppost: { postmessage, postimage }

func HandleGetRamenShopDetail(message map[string]interface{}) map[string]interface{} {
	log.Println(message["shopid"])

	response := make(map[string]interface{})

	return response
}