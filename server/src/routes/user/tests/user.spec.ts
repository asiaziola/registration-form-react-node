import request from 'supertest';
import app from '../../../server';
describe('POST /api/addUser', () => {
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

    test('response has firstName', async () => {
      const response = await request(app).post('/api/addUser').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        eventDate: '2020-10-09',
      });
      expect(response.body.firstName).toBeDefined();
    });
  });

  describe('when the data is missing', () => {
    test('should respond with a status code of 400', async () => {
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

    test('should respond with a status code of 400', async () => {
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

    test('should respond with a status code of 400', async () => {
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

    test('should respond with a status code of 400', async () => {
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
});
