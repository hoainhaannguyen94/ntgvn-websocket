import { Passport } from '../utils/passport/passport.mjs';

const phoneNumberChecker = (req, res, next) => {
    Passport.authenticate('phone-number', [req, res, next]);
}

export { phoneNumberChecker }
