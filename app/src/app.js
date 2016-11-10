
"use strict";

var express = require('express')
var sockets = require('signal-master/sockets')

var fs = require('fs')
var https = require('https')

var app = express()

var server = https.createServer(
  {
    key: fs.readFileSync("/app/config/sslcerts/privkey.pem"),
    cert: fs.readFileSync("/app/config/sslcerts/fullchain.pem")
  },
  app
)
server.listen(443)

app.listen(80)
app.get('*',function(req,res){
  if(!req.secure) {
    res.redirect('https://www.talktoatrumpsupporter.com'+req.url)
  }
})

var config =
{
  "isDev": false,
  "server": {
    "port": 443,
    "secure": true,
    "key": "config/sslcerts/privkey.pem",
    "cert": "config/sslcerts/fullchain.pem",
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
