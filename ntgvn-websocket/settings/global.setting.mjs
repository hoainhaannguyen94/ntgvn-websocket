import dotenv from 'dotenv';
dotenv.config();

const VERSION = process.env.VERSION;
const NODE_ENV = process.env.NODE_ENV;
const API_VERSION = process.env.API_VERSION;
const ENABLE_LOGGER_CONSOLE = process.env.ENABLE_LOGGER_CONSOLE;
const ENABLE_LOGGER_FILE = process.env.ENABLE_LOGGER_FILE;
const DOMAIN = process.env.DOMAIN;
const HOSTNAME = process.env.HOSTNAME;
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

export {
    VERSION,
    NODE_ENV,
    API_VERSION,
    ENABLE_LOGGER_CONSOLE,
    ENABLE_LOGGER_FILE,
    DOMAIN,
    HOSTNAME,
    HTTP_PORT,
    HTTPS_PORT
}
