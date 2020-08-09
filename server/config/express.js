/**
 * Express configuration
 */




const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const path = require('path');
// const routeApi = require('../route')
// const config = require('./environment');

module.exports = function(app) {
  const env = app.get('env');

  // **ALLOW CORS**** WARN: NOT SECURE 
  app.use(cors());

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  // app.use('/api', routeApi)


  if ('development' === env || 'test' === env) {
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};