const { should, expect } = require('chai');
const request = require('supertest');
const app = require('../server/index.js');
const PORT = process.env.PORT || 1337;

describe('Superhost Client Test Spec', () => {
  let server;
  beforeEach((done) => {
    server = app.listen(PORT, done);
    afterEach(() => {
      server.close();
    });
  });
  describe('Node Server Request Tests:', () => {
    it('Should answer GET requests for /analytics with a 200 status code', (done) => {
      request(app)
        .get('/analytics')
        .expect(200, done);
    });

    it('Should answer GET requests for /bloop with a 404 status code', (done) => {
      request(app)
        .get('/bloop')
        .expect(404, done);
    });

    it('Should return a JSON response for GET requests to /analytics', (done) => {
      request(app)
        .get('/analytics')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
