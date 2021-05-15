package main

import (
    "fmt"
    "log"
    "encoding/json"
    "net/http"

    "github.com/gorilla/websocket"
    "github.com/J-HowHuang/Ramen-Live/backend/api"
)

var payload map[string]interface{}
// var message map[string]interface{}

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,

    // We'll need to check the origin of our connection
    // this will allow us to make requests from our React
    // development server to here.
    // For now, we'll do no checking and just allow any connection
    CheckOrigin: func(r *http.Request) bool { return true },
}


func reader(conn *websocket.Conn) {
    for {
        _, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
        fmt.Println(string(p))
        // if err := conn.WriteMessage(messageType, p); err != nil {
        //     log.Println(err)
        //     return
        // }
        json.Unmarshal([]byte(p), &payload)
        message, messageTypeCheck := payload["message"].(map[string]interface{}); 
        if !messageTypeCheck {
            log.Println("message type incorrect!")
        }
        switch payload["task"] {
            case "login":
                log.Println("case login")
                handleLogin(message)
            case "getHomePage":
                log.Println("case getHomePage")
            case "getRamenShopDetail":
                log.Println("case getRamenShopDetail")
                
            default:
                log.Println("default")
        }
    }
}

func serveWs(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.Host)

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }
    reader(ws)
}

func setupRoutes() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Simple Server")
    })
    http.HandleFunc("/ws", serveWs)
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8088", nil)
}