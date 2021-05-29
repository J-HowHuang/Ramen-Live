import express from 'express'
import http from 'http'
import WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on( 'connection', ws => {
    console.log('connected!')
})

server.listen(4001, ()=>{
    console.log('Listening on port 4001')
})