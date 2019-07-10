const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app =  express();
const proxy = require('http-proxy-middleware')

var cors = require('cors')
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/:id', express.static(__dirname + '/public'));
// Review this line below to make sure I know what it is doing.
app.use('/', proxy({ target: 'http://localhost:3002', changeOrigin: true }))

app.listen(3202, () => {
  console.log('Listening on port 3202')
});

module.exports.app = app;
