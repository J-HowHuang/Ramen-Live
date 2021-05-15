package api

import (
	"log"
)

func HandleGetHomePage(message map[string]interface{}) {
	log.Println(message["homepageshoplist"])
}