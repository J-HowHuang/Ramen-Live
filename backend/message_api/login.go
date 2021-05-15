package github.com/J-HowHuang/Ramen-Live/backend/message_api

import (
	"log"
)

func init() {
	log.Println("successfully import")
}

func HandleLogin(message map[string]interface{}) {
	log.Println(message["userid"])
}