import request from 'supertest';
import * as userService from '../src/routes/user/service/user';
import app from '../src/server';

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
  describe('GET when there are no records', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/api/users');

      expect(response.statusCode).toBe(200);
    });

    test('should return empty array', async () => {
      const response = await request(app).get('/api/users');

      expect(response.body).toStrictEqual([]);
    });

    test('should catch an error', async () => {
      jest.spyOn(userService, 'getUsers').mockImplementationOnce(() => {
        throw new Error('some error');
      });

      const response = await request(app).get('/api/users');

      expect(response.body).toStrictEqual({ errors: 'some error' });
    });
  });

  describe('POST given correct data', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          eventDate: '2020-10-09',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/api/users').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('response should have proper fields', async () => {
      const response = await request(app).post('/api/users').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });

      expect(response.body.first_name).toEqual('John');
      expect(response.body.last_name).toEqual('Doe');
      expect(response.body.email).toEqual('john.doe@email.com');
      expect(response.body.event_date).toEqual('2020-10-09T00:00:00.000Z');
    });
  });

  describe('POST when the data is missing', () => {
    test('should respond with a status code of 400 and errors body when eventDate is missing', async () => {
      const response = await request(app).post('/api/users').send({
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

    test('should respond with a status code of 400 and errors body when email is missing', async () => {
      const response = await request(app).post('/api/users').send({
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

    test('should respond with a status code of 400 and errors body when lastName is missing', async () => {
      const response = await request(app).post('/api/users').send({
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
      const response = await request(app).post('/api/users').send({
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

  describe('POST when data is incorrect', () => {
    test('should respond with a status code of 400 and errors body when firstName is invalid', async () => {
      const response = await request(app).post('/api/users').send({
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
      const response = await request(app).post('/api/users').send({
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
      const response = await request(app).post('/api/users').send({
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
      const response = await request(app).post('/api/users').send({
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

  describe('POST when error', () => {
    test('should catch an error', async () => {
      jest.spyOn(userService, 'addUser').mockImplementationOnce(() => {
        throw new Error('some error');
      });

      const response = await request(app).post('/api/users').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });

      expect(response.body).toStrictEqual({ errors: 'some error' });
    });
  });

  describe('GET when there are records', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/api/users');

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        {
          email: 'john.doe@email.com',
          event_date:
            'Fri Oct 09 2020 02:00:00 GMT+0200 (Central European Summer Time)',
          first_name: 'John',
          id: 1,
          last_name: 'Doe',
        },
      ]);
    });
  });
});
