import { createLogger, format, transports } from "winston"; 

export function getLogger(level, filename){
    return createLogger({
    level: level,
    format: format.json(),
    transports: [
        new transports.File({filename: filename})
        ]
    });
}