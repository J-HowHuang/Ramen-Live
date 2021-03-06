package websocket

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/J-HowHuang/Ramen-Live/backend/pkg/api"
	"github.com/gorilla/websocket"
)

type apiFunc func(map[string]interface{}) map[string]interface{}

var apiHandle = map[string]apiFunc{
	"login":             api.HandleLogin,
	"register":          api.HandleRegister,
	"createShop":        api.HandleCreateShop,
	"post":              api.HandlePost,
	"getShopsBrief":     api.HandleGetShopsBrief,
	"getShopDetail":     api.HandleGetShopDetail,
	"getPosts":          api.HandleGetPosts,
	"getShopsInRegions": api.HandleGetShopsInRegions,
	"getNearbyShops":	 api.HandleGetNearbyShops,
	"removeShop":        api.HandleRemoveShop,
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return ws, err
	}
	return ws, nil
}

func Reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println(string(p))

		// if err := conn.WriteMessage(messageType, p); err != nil {
		//     log.Println(err)
		//     return
		// }

		payload := make(map[string]interface{})
		json.Unmarshal([]byte(p), &payload)

		task, taskTypeCheck := payload["task"].(string)
		if !taskTypeCheck {
			log.Println("task type incorrect!")
		}

		message, messageTypeCheck := payload["message"].(map[string]interface{})
		if !messageTypeCheck {
			log.Println("message type incorrect!")
		}
		log.Println(message)

		response := make(map[string]interface{})
		if _, ok := apiHandle[task]; ok {
			response_content := apiHandle[task](message)
			response["task"] = payload["task"]
			response["content"] = response_content
		} else {
			response["task"] = payload["task"]
			content := make(map[string]interface{})
			content["status"] = "error"
			content["message"] = "no such task"
			response["content"] = content
		}
		response_json, _ := json.Marshal(response)
		conn.WriteMessage(messageType, response_json)
	}
}

func Writer(conn *websocket.Conn) {
	for {
		fmt.Println("Sending")
		messageType, r, err := conn.NextReader()
		if err != nil {
			fmt.Println(err)
			return
		}
		w, err := conn.NextWriter(messageType)
		if err != nil {
			fmt.Println(err)
			return
		}
		if _, err := io.Copy(w, r); err != nil {
			fmt.Println(err)
			return
		}
		if err := w.Close(); err != nil {
			fmt.Println(err)
			return
		}
	}
}
