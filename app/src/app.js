
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
app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

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
  let nrooms = Object.keys(rooms).length
  let result = "NO_ROOMS"
  let i = 1
  console.log("n rooms:" + nrooms.toString())
  for (let roomName in rooms) {
    let roomContents = rooms[roomName]
    let roomSize = Object.keys(roomContents).length
    if (roomName.startsWith("trump")
        && roomSize > 0 && roomSize < 3
        && Math.random() < (1.0/i)) {
      result = roomName
      i ++;
    }
  }
  return result
}

app.use(express.static('static'))

app.get('/api/trump', function (req, res) {
  res.send('trump')
})

app.get('/api/not', function (req, res) {
  res.send(getTrumpRoom())
})

console.log("Server up...")
