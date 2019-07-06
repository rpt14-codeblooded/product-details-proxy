const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app =  express();
const proxy = require('http-proxy-middleware')


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use('/', proxy({target: 'http://localhost:3002', changeOrigin: true}))
app.listen(3102, () => {
  console.log('Listening on port 3002')
});