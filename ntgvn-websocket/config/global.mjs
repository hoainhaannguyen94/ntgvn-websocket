import dotenv from 'dotenv';
dotenv.config();

const VERSION = process.env.VERSION;
const NODE_ENV = process.env.NODE_ENV;
const API_VERSION = process.env.API_VERSION;
const DOMAIN = process.env.DOMAIN;
const HOSTNAME = process.env.HOSTNAME;
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

export {
    VERSION,
    NODE_ENV,
    API_VERSION,
    DOMAIN,
    HOSTNAME,
    HTTP_PORT,
    HTTPS_PORT
}
