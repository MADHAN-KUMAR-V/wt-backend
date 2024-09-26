const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const logger = require("./logger");
const routes = require('./routers/index')

logger.info("Logger initialized and ready to log!");

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware to log all incoming requests (should be before routes)
app.use((req, res, next) => {
    const logDetails = {
      time: new Date().toISOString(), // Current time
      method: req.method, // HTTP method
      url: req.originalUrl, // URL
      headers: req.headers, // Headers
      body: req.body, // Body
      query: req.query, // Query parameters
    };
    logger.info(`Request Details: ${JSON.stringify(logDetails, null, 2)}\n\n\n\n\n`);
    next();
  });

// Use centralized routes
app.use("/api/v1/",routes);

module.exports = app;
