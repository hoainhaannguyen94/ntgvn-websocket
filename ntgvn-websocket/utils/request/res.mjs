import { Logger } from '../logger/logger.mjs';

const resHanlder = (req, res, code, result) => {
    Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
    res.status(code).json({
        value: result
    });
}

export {
    resHanlder
}
