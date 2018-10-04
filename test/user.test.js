/* global describe it */

// eslint-disable-next-line
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../src/server/index.js');

describe('User', () => {
  it('should return a 200 response', (done) => {
    request(server)
      .get('/api/exercise/new-user')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should create a new user', (done) => {
    request(server)
      .post('/api/exercise/new-user')
      .send({ userName: 'John' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) { done(err); }
        expect(res.body.userName).to.equal('John');
        done();
      });
  });
});
