package api

import (
	"log"
)

func handleLogin(message map[string]interface{}) {
	log.Println(message["userid"])
}