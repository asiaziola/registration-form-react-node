import request from 'supertest';
import app from '../src/server';

import knex from 'knex';
import mockDb from 'mock-knex';
const db = knex({
  client: 'sqlite',
  useNullAsDefault: true,
});

mockDb.mock(db);

describe('POST /api/addUser', () => {
  afterAll(() => {
    mockDb.unmock(db);
    jest.resetAllMocks();
  });
  describe('given correct data', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .post('/api/addUser')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          eventDate: '2020-10-09',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(200);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/api/addUser').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('response should have proper field', async () => {
      const response = await request(app).post('/api/addUser').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });
      expect(response.body.first_name).toEqual('John');
      expect(response.body.last_name).toEqual('Doe');
      expect(response.body.email).toEqual('john.doe@email.com');
      expect(response.body.event_date).toEqual('2020-10-09');
    });
  });

  describe('when the data is missing', () => {
    test('should respond with a status code of 400 when eventDate is missing', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when email is missing', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when lastName is missing', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when firstName is missing', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });
  });

  describe('when data is incorrect', () => {
    test('should respond with a status code of 400 when firstName is invalid', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when lastName is invalid', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when email is invalid', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });

    test('should respond with a status code of 400 when eventDate is invalid', async () => {
      const response = await request(app).post('/api/addUser').send({
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
    });
  });
});
