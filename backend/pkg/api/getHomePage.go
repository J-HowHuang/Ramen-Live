package api

import (
	"log"
)

// GetHomePage:

// frontend -> {  } -> backend

// backend  -> { shopdetail([]shop) }

func HandleGetHomePage(message map[string]interface{}) map[string]interface{} {
	log.Println(message["homepageshoplist"])
	
	response := make(map[string]interface{})

	return response
}