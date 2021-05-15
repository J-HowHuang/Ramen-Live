package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/J-HowHuang/Ramen-Live/backend/pkg/websocket"
)

func serveWs(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.Host)
    ws, err := websocket.Upgrade(w, r)
    if err != nil {
        log.Println(err)
    }
    // go websocket.Writer(ws)
    websocket.Reader(ws)
}

func setupRoutes() {
    http.HandleFunc("/ws", serveWs)
}

func main() {
    setupRoutes()
    http.ListenAndServe(":8088", nil)
}