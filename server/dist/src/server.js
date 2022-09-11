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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const body_parser_1 = __importDefault(require("body-parser"));
const connectToDb_1 = require("./database/connectToDb");
const initDb_1 = require("./database/initDb");
const path_1 = __importDefault(require("path"));
require('dotenv').config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, initDb_1.initDb)(connectToDb_1.db);
}))();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../../client/build')));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(index_1.appRouter);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../../client/build', 'index.html'));
});
app.listen(port, function () {
    console.log(`App listening on port: ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map