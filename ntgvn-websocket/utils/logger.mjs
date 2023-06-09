import { ENABLE_LOGGER_CONSOLE, ENABLE_LOGGER_FILE } from '../settings/logger.setting.mjs';
import { createLogger, transports, format } from 'winston';

const Logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console({
            silent: !ENABLE_LOGGER_CONSOLE
        }),
        new transports.File({
            silent: !ENABLE_LOGGER_FILE,
            level: 'error',
            filename: 'logs/server.log'
        })
    ]
});

export { Logger }
