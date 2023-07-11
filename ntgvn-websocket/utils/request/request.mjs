import { Logger } from '../logger/logger.mjs';

/**
 * @function
 * @description
 * - Informational responses (100 – 199)
 * - Successful responses (200 – 299)
 * - Redirection messages (300 – 399)
 * - Client error responses (400 – 499)
 * - Server error responses (500 – 599)
 * @param {*} req 
 * @param {number} code
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const showLog = (req, code) => {
    if (code < 400)
        Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
    else
        Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
}

const resJSON = (req, res, code, result) => {
    showLog(req, code);
    res.status(code).json({
        value: result
    });
}

const resSend = (req, res, code, data) => {
    showLog(req, code);
    res.status(code).send(data);
}

export {
    resJSON,
    resSend
}
