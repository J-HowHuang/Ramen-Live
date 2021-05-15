package api

import (
	"log"
)

func HandleLogin(message map[string]interface{}) map[string]interface{} {
	log.Println(message["userid"])
	response := make(map[string]interface{})
	// var userinformation map[string]interface{}
	// userinformation["username"] = "kaikai"
	// userinformation["useravatar"] = "pekora"
	// response["userinformation"] = userinformation
	// response["homepageshoplist"] = [...]string{"ggg", "pongstar", "ggb"}
	// log.Println(response)

	// TODO: OOP Design

	response["homepageshoplist"] = [...]string{"ggg", "pongstar", "ggb"}

	return response
}