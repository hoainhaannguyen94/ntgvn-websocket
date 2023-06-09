import { PhoneNumberStrategy } from './phone-number.strategy.mjs';

export class Authenticator {
    strategies = new Map();

    use(name, strategy) {
        this.strategies.set(name, strategy);
    }

    async authenticate(name, args) {
        if (!this.strategies.has(name)) {
            return false;
        }
        return this.strategies.get(name).authenticate.apply(null, args);
    }
}

export const Passport = new Authenticator();
Passport.use('phone-number', new PhoneNumberStrategy());
