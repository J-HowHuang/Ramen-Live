package api

import (
	"log"
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

// User verification is done by Line API

// Login:

// frontend -> { userid }                                      -> backend

// backend  -> { userinformation, homepageshoplist([]shopid) } -> frontend
// 		- userinformation: { username, useravatar }

func HandleLogin(message map[string]interface{}) map[string]interface{} {
	log.Println(message["userid"])
	response := make(map[string]interface{})
	// userinformation:= make(map[string]interface{})

	// some db queries

	// type assertion
	userid, useridTypeCheck := message["userid"].(string)
	if !useridTypeCheck {
		log.Println("userid type incorrect!")
	}
	response["userinformation"] = db.GetUserInformation(userid)

	response["homepageshoplist"] = [...]string{"ggg", "pongstar", "ggb"}

	// TODO: OOP Design

	return response
}