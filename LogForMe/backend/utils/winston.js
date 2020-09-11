const winston = require('winston');
require('winston-daily-rotate-file');

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf(({level, message, timestamp}) => {
    return `${timestamp}__${level}__${message}&&&&`;
});
// Level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

const transport_all = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  // datePattern: 'YYYY-MM-DD-HH',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: "logs",
  maxSize: '20m',
  maxFiles: '14d'
});

const transport_error = new winston.transports.DailyRotateFile({
    filename: 'ERROR-%DATE%.log',
    // datePattern: 'YYYY-MM-DD-HH',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    dirname: "logs",
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
});

const logger = winston.createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
  transports: [
    transport_all,
    transport_error
  ]
});

logger.info('Hello World!');

module.exports = {logger};