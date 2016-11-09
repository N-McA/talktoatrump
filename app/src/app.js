
"use strict";

var express = require('express')
var sockets = require('signal-master/sockets')

var app = express()
var server = app.listen(80)
var config = {
  "turnservers":[]
}
var signalServer = sockets(server, config)

// setInterval(() => console.log(JSON.stringify(signalServer.nsps['/'].adapter.rooms)), 5000)

function getTrumpRoom() {
  let rooms = signalServer.nsps['/'].adapter.rooms
  for (let roomName in rooms) {
    console.log(roomName)
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
