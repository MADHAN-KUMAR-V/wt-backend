const winston = require('winston');
require('winston-daily-rotate-file');

// Configure winston transports based on NODE_ENV
const transports = [];

// Define the file transport
const fileTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log', // Log file path and naming pattern
    datePattern: 'YYYY-MM-DD',               // Rotate logs daily
    zippedArchive: true,                     // Optionally gzip archive the logs
    maxSize: '20m',                          // Maximum log file size before rotation
    maxFiles: '7d'                           // Keep logs for 7 days
});

transports.push(fileTransport);

if (process.env.NODE_ENV === 'development') {
    // Add console transport for development environment
    const consoleTransport = new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),       // Add color to console logs
            winston.format.simple()          // Simple log format for console
        )
    });
    transports.push(consoleTransport);
}

// Create the logger
const logger = winston.createLogger({
    level: 'info',                           // Set the logging level (info, warn, error, etc.)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()                // Use JSON format for logs
    ),
    transports: transports
});

// Export the logger to be used in other files
module.exports = logger;
