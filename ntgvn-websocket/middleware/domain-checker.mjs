import { DOMAIN } from '../config/global.mjs';
import { Logger } from '../utils/logger/logger.mjs';

const domainChecker = (req, res, next) => {
    if (req.headers.domain !== DOMAIN) {
        Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
        res.status(401).json(new Error('Invalid Domain'));

        return;
    }

    next();
}

export {
    domainChecker
}
