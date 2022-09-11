"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./validations/user");
const user_2 = require("./controller/user");
const router = (0, express_1.default)();
router.post('/', user_1.validations, user_2.addUserController);
router.get('/', user_2.getUsersController);
exports.default = router;
//# sourceMappingURL=user.js.map