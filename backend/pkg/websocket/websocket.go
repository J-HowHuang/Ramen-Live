package websocket

import (
    "fmt"
    "io"
	"log"
	"encoding/json"
    "net/http"
	"github.com/gorilla/websocket"
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/api"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool { return true },
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
        message, messageTypeCheck := payload["message"].(map[string]interface{}); 
        if !messageTypeCheck {
            log.Println("message type incorrect!")
		}
		
		log.Println(message)
		
        switch payload["task"] {
            case "login":
				log.Println("case login")
				response, _ := json.Marshal(api.HandleLogin(message))
				conn.WriteMessage(messageType, response)

            case "getHomePage":
				log.Println("case getHomePage")
				api.HandleGetHomePage(message)
				
            case "getRamenShopDetail":
				log.Println("case getRamenShopDetail")
				api.HandleGetRamenShopDetail(message)
                
            default:
                log.Println("default")
        }
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