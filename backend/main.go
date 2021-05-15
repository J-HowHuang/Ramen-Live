package main

import (
    "fmt"
    "net/http"

    "github.com/J-HowHuang/Ramen-Live/pkg/websocket"
)

var payload map[string]interface{}

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