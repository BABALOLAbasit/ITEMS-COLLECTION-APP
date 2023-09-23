const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const chalk = require('chalk');
const path = require('path');
const logger = require('./midleware/logger');

const app = express();


// Define a rate limit configuration
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // maximum 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/', limiter);


//Init middleware
app.use(logger);


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Items API Routes
app.use('/api/items', require('./Routes/Api/items'));
const PORT = process.env.PORT || 5000;






app.listen(PORT, () => {
    console.log(chalk.blue(`Server is running on port ${PORT}`));
  })


