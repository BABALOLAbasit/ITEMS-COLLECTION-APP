const moment = require('moment');
const chalk = require('chalk');




// Middleware for logging requests
const logger = ((req, res, next) => {
    console.log(chalk.yellow(`Received ${req.method} request at ${req.path}: ${moment().format()}`));

    next();
  });


  module.exports = logger;