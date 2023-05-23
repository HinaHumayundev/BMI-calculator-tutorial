import config from 'config';
import winston, { LoggerOptions } from 'winston';

const logConfiguration: LoggerOptions = {
  level: config.get('log.level'),
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.label({
      label: `${config.get('log.label')}`
    }),
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.printf(
      info => `[${info.label}]: [${info.timestamp}]: [${info.level.toUpperCase()}]: ${info.message}`
    )
  )
};

const logger = winston.createLogger(logConfiguration);

export default logger;
