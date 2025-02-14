const winston = require("winston");

const logger = winston.createLogger({  
    level: 'debug',  
    transports: [new winston.transports.File({filename: "cenas.log"})],  
  });  

class ValidationError extends Error{        
    constructor(message){
        super(message);
        this.bananas = message;
        logger.info(`ValidationError '${this.bananas} created.`)
    }
}

try{
    const cenas = false;
    if (!cenas){
        winston.loggers.error("cenas", e) 
        throw new ValidationError("BANG");
    }
}

catch (e){
    if (e instanceof(ValidationError))
        console.error("cenas", e);
}