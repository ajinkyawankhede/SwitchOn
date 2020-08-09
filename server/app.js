"use strict";


// Set default node environment to development
const PORT = process.env.VENDOR_NODE_ENV || 8800;
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const axios = require('axios')
const express = require('express');
const app = express();
const server = require('http').createServer(app);
// var expressWs = require('express-ws')(app);

var io = require('socket.io')
const socketIo = io(server);
exports = module.exports = socketIo
const mongoose = require('mongoose');
const apiRoutes = require('./route');

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/forms');

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1)
});


app.use(
    cors({
        origin: true,
        credentials: true
    })
);
// app.use(cors())
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.header('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use('/api', apiRoutes)


require('./config/express')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use('/', view);


// Start server
server.listen(PORT, function () {
  console.log('Express server listening on %d, in %s mode', 8800, app.get('env'));
});
app.use(express.static(path.join(__dirname, 'public')));


//  app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//    console.log(msg);
//   });
//   console.log('socket', req.testing);
// });
// app.get('/main', function(req, res) {
//   var name = 'hello';
//   res.render(__dirname + "/public/index", {name:name});
// });



// Expose app
exports = module.exports = app;