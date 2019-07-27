const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app =  express();
var path = require('path');
const proxy = require('http-proxy-middleware');


const dir = path.parse(__dirname).dir;
console.log('dir', dir)
var cors = require('cors')
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(dir + '/public'));
app.use('/:id', express.static(dir + '/public'));

app.use(
  `${dir}`,
  proxy({
    target: 'http://ec2-18-188-146-137.us-east-2.compute.amazonaws.com'
  })
);

var port = process.env.PORT || 3202;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports.app = app;