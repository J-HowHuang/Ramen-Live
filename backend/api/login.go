package api

import (
	"fmt"
)

func handleLogin(message map[string]interface{}) {
	log.Println(message["userid"])
}