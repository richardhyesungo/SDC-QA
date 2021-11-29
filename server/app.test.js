const request = require('supertest');
const app = require('./app.js');

describe('GET /qa/questions', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).get('/qa/questions');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('POST /qa/questions', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).post('/qa/questions');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('GET /qa/questions/319531/answers', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).get('/qa/questions/319531/answers');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('POST /qa/questions/319531/answers', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).get('/qa/questions/319531/answers');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('PUT /qa/questions/319531/helpful', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).put('/qa/questions/319531/helpful');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('PUT /qa/questions/319531/report', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).put('/qa/questions/319531/report');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('PUT /qa/answers/2983211/helpful', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).put('/qa/answers/2983211/helpful');
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('PUT /qa/answers/2983211/report', () => {
  describe('test', () => {
    test('should test', async () => {
      const response = await request(app).put('/qa/answers/2983211/report');
      expect(response.statusCode).toBe(200);
    });
  });
});
