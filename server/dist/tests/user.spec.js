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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
jest.mock('../src/database/connectToDb', () => {
    let knex = require('knex');
    const connectToDb = () => {
        let db = knex({
            client: 'sqlite3',
            connection: {
                filename: ':memory:',
            },
            useNullAsDefault: true,
        });
        return db;
    };
    const db = connectToDb();
    return { db };
});
describe('/api/users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
    afterAll((done) => {
        jest.resetAllMocks();
        done();
    });
    describe('GET when there are no records', () => {
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/api/users')
                    .expect('Content-Type', /json/);
                expect(response.statusCode).toBe(200);
                expect(response.body).toBe([]);
            }), 1000);
        }));
    });
    describe('POST given correct data', () => {
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/api/users')
                    .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@email.com',
                    eventDate: '2020-10-09',
                })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/);
                expect(response.statusCode).toBe(200);
            }));
        }));
        test('should specify json in the content type header', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        }));
        test('response should have proper field', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.body.first_name).toEqual('John');
            expect(response.body.last_name).toEqual('Doe');
            expect(response.body.email).toEqual('john.doe@email.com');
            expect(response.body.event_date).toEqual('2020-10-09');
        }));
    });
    describe('POST when the data is missing', () => {
        test('should respond with a status code of 400 when eventDate is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                value: undefined,
                msg: 'Invalid value',
                param: 'eventDate',
                location: 'body',
            });
        }));
        test('should respond with a status code of 400 when email is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                value: undefined,
                msg: 'Invalid value',
                param: 'email',
                location: 'body',
            });
        }));
        test('should respond with a status code of 400 when lastName is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                value: undefined,
                msg: 'Invalid value',
                param: 'lastName',
                location: 'body',
            });
        }));
        test('should respond with a status code of 400 when firstName is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                lastName: 'Doe',
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                value: undefined,
                msg: 'Invalid value',
                param: 'firstName',
                location: 'body',
            });
        }));
    });
    describe('POST when data is incorrect', () => {
        test('should respond with a status code of 400 when firstName is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 123,
                lastName: 'Doe',
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                location: 'body',
                msg: 'Invalid value',
                param: 'firstName',
                value: 123,
            });
        }));
        test('should respond with a status code of 400 when lastName is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 123,
                email: 'john.doe@email.com',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                location: 'body',
                msg: 'Invalid value',
                param: 'lastName',
                value: 123,
            });
        }));
        test('should respond with a status code of 400 when email is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doeemail.com',
                eventDate: '2020-10-09',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                location: 'body',
                msg: 'Invalid value',
                param: 'email',
                value: 'john.doeemail.com',
            });
        }));
        test('should respond with a status code of 400 when eventDate is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                eventDate: 123,
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toContainEqual({
                location: 'body',
                msg: 'Invalid value',
                param: 'eventDate',
                value: 123,
            });
        }));
    });
    describe('GET when there are records', () => {
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .get('/api/users')
                .expect('Content-Type', /json/);
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual([
                {
                    email: 'john.doe@email.com',
                    event_date: '2020-10-09',
                    first_name: 'John',
                    id: 1,
                    last_name: 'Doe',
                },
            ]);
        }));
    });
});
//# sourceMappingURL=user.spec.js.map