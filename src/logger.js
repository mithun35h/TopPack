import winston from 'winston';
import fs from 'fs';
import {config} from './config';
import moment from 'moment';

const logDir = config.log_directory;
const logFile = config.log_file;
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => moment().format();
const logger = new(winston.Logger)({
    transports: [
        new(require('winston-daily-rotate-file'))({filename: `${logDir}/${logFile}`, timestamp: tsFormat, datePattern: 'yyyy-MM-dd',json: false, colorize: true, level: 'info'})
    ]
});
exports.logger = logger;
