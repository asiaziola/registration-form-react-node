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
exports.getUsers = exports.addUser = void 0;
const connectToDb_1 = require("../../../database/connectToDb");
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, eventDate } = userData;
    let userInsert = {
        first_name: firstName,
        last_name: lastName,
        email,
        event_date: eventDate,
    };
    const result = yield (0, connectToDb_1.db)('users')
        .insert(userInsert)
        .onConflict('email')
        .ignore();
    return userInsert;
});
exports.addUser = addUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connectToDb_1.db)('users').select('*');
    return result;
});
exports.getUsers = getUsers;
//# sourceMappingURL=user.js.map