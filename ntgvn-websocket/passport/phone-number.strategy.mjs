import { Strategy } from './strategy.mjs';
import { jwtChecker } from '../middlewares/jwt.checker.mjs';

export class PhoneNumberStrategy extends Strategy {
    async authenticate(...args) {
        const [ req, res, next ] = args;
        await jwtChecker(req, res, next);
    }
}
