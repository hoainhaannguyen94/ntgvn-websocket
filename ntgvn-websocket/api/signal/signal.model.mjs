import { generateAccessToken } from '../../utils/jwt/jwt.mjs';
import { emitData } from '../../utils/socket/socket.mjs';

const subscribe = req => {
    try {
        return generateAccessToken(req);
    } catch (_) {
        return undefined;
    }
}

const emit = req => {
    try {
        const data = req.body.value;
        const key = req.body.key;
        return emitData(key, data);
    } catch (_) {
        return undefined;
    }
}

export {
    subscribe,
    emit
}
