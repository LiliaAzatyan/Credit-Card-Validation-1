"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class DataHandler,
 * Validation
 */
class DataHandler {
    constructor() {
        /**
         * @class DataHandler
         * @function ValidationHandler
         * @description
         * @param req
         * @param res
         */
        this.luhnAlgorithm = (num) => {
            let arr = (num + '')
                .split('')
                .reverse()
                .map(x => parseInt(x));
            let lastDigit = arr.splice(0, 1)[0];
            let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
            sum += lastDigit;
            return sum % 10 === 0;
        };
    }
    async ValidationHandler(req, res) {
        console.log("INFO ==>", req.body);
        const { cardNumber, expiryMonth, expiryYear, cvv } = req.body;
        const nowDate = new Date();
        const cardEpiry = new Date(expiryYear, expiryMonth, 1);
        console.log('nowDate -->', nowDate);
        console.log('cardEpiry ==>', cardEpiry);
        if (!cardEpiry || cardEpiry < nowDate) {
            console.log('Card expiration problem');
            res.send({ error: true, message: 'Card expiration problem' });
        }
        ;
        if (cardNumber.slice(0, 2) === '34' || '37') {
            console.log(`American Express card`);
            if (cvv.lenght !== 4) {
                console.log(`American Express card's Cvv code must be 4 digits`);
                res.send({ error: true, message: `American Express card's Cvv code must be 4 digits` });
            }
        }
        ;
        if (cvv.lenght !== 3) {
            console.log('CVV is incorrect');
            res.send({ error: true, message: `CVV is incorrect.` });
        }
        ;
        if (!(cardNumber.lenght >= 16 && cardNumber.lenght <= 19)) {
            console.log(`Valid card numbers must contain from 16 to 19 digits`);
            res.send({ error: true, message: `Valid card numbers must contain from 16 to 19 digits.` });
        }
        ;
        if (!this.luhnAlgorithm(cardNumber)) {
            console.log(`Card number does not correspond to ISO standards.`);
            res.send({ error: true, message: `Card number does not correspond to ISO standards.` });
        }
    }
    ;
}
exports.default = new DataHandler();
//# sourceMappingURL=data.handler.js.map