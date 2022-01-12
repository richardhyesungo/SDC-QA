const request = require('supertest');
const app = require('../app.js');

// integration tests
describe('Questions API endpoint tests', () => {
  describe('add question', () => {
    test('should test', async () => {
      const response = await request(app).post('/qa/questions');
      expect(response.statusCode).toBe(201);
    });
  });
  describe('get question', () => {
    test('should test', async () => {
      const response = await request(app).get('/qa/questions');
      expect(response.statusCode).toBe(200);
    });
  });
});
