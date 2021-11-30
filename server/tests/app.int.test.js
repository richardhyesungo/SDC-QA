const request = require('supertest');
const app = require('../app.js');

// integration tests
describe('test test', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).get('/qa/questions');
      expect(response.statusCode).toBe(200);
    });
  });
});
