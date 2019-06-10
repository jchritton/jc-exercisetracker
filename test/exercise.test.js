/* global describe it before */

// eslint-disable-next-line
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../src/server/index.js');

// TODO: Create a user in before step, delete user in after.

describe('Exercise', () => {
  let userId;

  before(() => {
    request(server)
      .post('/api/exercise/new-user')
      .send({ userName: 'John' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        userId = res.body.id;
      });
  });

  it('should return a 200 response', (done) => {
    request(server)
      .post('/api/exercise/add')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should add an exercise to an existing user', (done) => {
    request(server)
      .post('/api/exercise/add')
      .send({
        userId: 'iDs4DT',
        description: 'Running on treadmill',
        duration: 15,
        date: '2018-10-05'
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it("should return a user's exercise log within default limits", (done) => {
    request(server)
      .post(`/api/exercise/log?userId=${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).not.to.be(null);
        done();
      });
  });

  it("should return a user's exercise log", (done) => {
    request(server)
      .get(
        `/api/exercise/log?userId=${userId}&from=2018-10-01&to=2018-10-05&limit=5`
      )
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
