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
exports.initDb = void 0;
function initDb(db) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield db.schema.hasTable('users'))) {
            yield db.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('first_name', 64).notNullable().index();
                table.string('last_name', 64).notNullable().index();
                table.string('email', 64).notNullable().unique().index();
                table.dateTime('event_date');
            });
        }
    });
}
exports.initDb = initDb;
//# sourceMappingURL=initDb.js.map