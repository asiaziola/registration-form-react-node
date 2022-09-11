"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user/user"));
const router = express_1.default.Router();
exports.appRouter = router;
router.use('/api/users', user_1.default);
//# sourceMappingURL=index.js.map