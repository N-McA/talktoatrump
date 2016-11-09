var express = require('express')
const pug = require('pug');
var app = express();
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('template', { title: 'Hey', message: 'Hello there!' })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
