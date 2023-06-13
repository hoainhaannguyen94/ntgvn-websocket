import { generateAccessToken } from '../../utils/jwt/jwt.mjs';
import { emitData } from '../../utils/socket/socket.mjs';

const subscribe = async req => {
    try {
        return generateAccessToken(req);
    } catch (_) {
        return undefined;
    }
}

const emit = async req => {
    try {
        const data = req.body.value;
        const key = req.body.key;
        if (key) {
            emitData(key, data);
        }
        return true;
    } catch (_) {
        return undefined;
    }
}

export {
    subscribe,
    emit
}
