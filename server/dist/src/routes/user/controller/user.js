"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = exports.addUserController = void 0;
const express_validator_1 = require("express-validator");
const user_dto_1 = require("../dto/user.dto");
const user_1 = require("../service/user");
const addUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const result = yield (0, user_1.addUser)(new user_dto_1.UserDTO(req.body));
        return res.status(200).json(result);
    }
    catch (e) {
        res.status(500);
        res.json({ errors: e.message });
    }
});
exports.addUserController = addUserController;
const getUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_1.getUsers)();
        return res.status(200).json(result);
    }
    catch (e) {
        res.status(500);
        res.json({ errors: e.message });
    }
});
exports.getUsersController = getUsersController;
//# sourceMappingURL=user.js.map