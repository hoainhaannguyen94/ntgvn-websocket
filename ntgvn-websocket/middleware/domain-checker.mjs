import { DOMAIN } from '../config/global.mjs';
import { Logger } from '../utils/logger/logger.mjs';

const domainChecker = (req, res, next) => {
    const headers = req.headers;
    if (headers.domain === DOMAIN) {
        next();
    } else {
        Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
        res.status(401).json(new Error('Invalid Domain'));
    }
}

export { domainChecker }
