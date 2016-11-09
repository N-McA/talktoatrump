var express = require('express')
var app = express()
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 });


// Express stuff
// app.get('/', function (req, res) {
//   res.send('Hello World!!!!')
// })

app.use(express.static('static'))

app.get('/api/trump', function (req, res) {
  res.send('Trump id')
})

app.get('/api/not', function (req, res) {
  res.send('not trump id')
})

app.listen(80, function () {
	  console.log('Example app listening on port 80!')
})
// end express

// signalling server stuff

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if (!msg.type) console.log(JSON.stringify(message));
    switch (msg.type) {
      case "signalling":

    }
    console.log('received: %s', message);
  });

  ws.send('something');
});
// end signalling server
