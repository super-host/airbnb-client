const { should, expect } = require('chai');
// const should = require('chai').should;
// const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../server/index.js');

// before and after hooks
// before( () => {

// });

describe('Node Server Request Listener Function', () => {
  it('Should answer GET requests for /analytics with a 200 status code', (done) => {
    supertest(server)
      .get('/analytics')
      .expect(200, done);
  });

  it('Should answer GET requests for /bloop with a 404 status code', (done) => {
    supertest(server)
      .get('/bloop')
      .expect(404, done);
  });

  it('Should return a JSON response for GET requests to /analytics', (done) => {
    supertest(server)
      .get('/analytics')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// After all tests are finished drop database and close connection
afterEach(() => {
  server.close();
});
