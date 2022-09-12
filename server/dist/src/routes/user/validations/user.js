"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
const express_validator_1 = require("express-validator");
exports.validations = [
    (0, express_validator_1.body)('firstName').exists().isString().notEmpty(),
    (0, express_validator_1.body)('lastName').exists().isString().notEmpty(),
    (0, express_validator_1.body)('email').exists().isEmail().notEmpty(),
    (0, express_validator_1.body)('eventDate').exists().isISO8601().toDate().notEmpty(),
];
//# sourceMappingURL=user.js.map