
"use strict";

var express = require('express')
var sockets = require('signal-master/sockets')

var app = express()
var server = app.listen(80)
var config =
{
  "isDev": false,
  "server": {
    "port": 8080,
    "secure": true,
    "key": "config/sslcerts/key.pem",
    "cert": "config/sslcerts/cert.pem",
    "password": null
  },
  "rooms": {
    "maxClients": 0
  },
  "stunservers": [
    {
      "url": "stun:stun.l.google.com:19302"
    }
  ],
  "turnservers": []
}
var signalServer = sockets(server, config)

// setInterval(() => console.log(JSON.stringify(signalServer.nsps['/'].adapter.rooms)), 5000)

function getTrumpRoom() {
  let rooms = signalServer.nsps['/'].adapter.rooms
  console.log("n rooms:" + Object.keys(rooms).length.toString())
  for (let roomName in rooms) {
    let roomContents = rooms[roomName]
    let roomSize = Object.keys(roomContents).length
    if (roomName.startsWith("trump")
      && roomSize > 0 && roomSize < 4) {
      return roomName
    }
  }
  return "NO_ROOMS"
}

app.use(express.static('static'))

app.get('/api/trump', function (req, res) {
  res.send('trump')
})

app.get('/api/not', function (req, res) {
  res.send(getTrumpRoom())
})

console.log("Server up...")
