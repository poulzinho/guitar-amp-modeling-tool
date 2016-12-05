'use strict';

var app = require('../..');
import request from 'supertest';

var newSndfx;
var user;
describe('Sndfx API:', function () {

  describe('GET /api/sndfxs', function () {
    var sndfxs;

    beforeEach(function (done) {
      request(app)
        .get('/api/sndfxs', function (req, res, next) {
          user = req.query.user;
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sndfxs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      expect(sndfxs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/sndfxs', function () {
    beforeEach(function (done) {
      request(app)
        .post('/api/sndfxs')
        .send({
          name: 'New Sndfx',
          info: 'This is the brand new sndfx!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSndfx = res.body;
          done();
        });
    });

    it('should respond with the newly created sndfx', function () {
      expect(newSndfx.name).to.equal('New Sndfx');
      expect(newSndfx.info).to.equal('This is the brand new sndfx!!!');
    });

  });

  describe('GET /api/sndfxs/:id', function () {
    var sndfx;

    beforeEach(function (done) {
      request(app)
        .get('/api/sndfxs/' + newSndfx._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sndfx = res.body;
          done();
        });
    });

    afterEach(function () {
      sndfx = {};
    });

    it('should respond with the requested sndfx', function () {
      expect(sndfx.name).to.equal('New Sndfx');
      expect(sndfx.info).to.equal('This is the brand new sndfx!!!');
    });

  });

  describe('PUT /api/sndfxs/:id', function () {
    var updatedSndfx;

    beforeEach(function (done) {
      request(app)
        .put('/api/sndfxs/' + newSndfx._id)
        .send({
          name: 'Updated Sndfx',
          info: 'This is the updated sndfx!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          updatedSndfx = res.body;
          done();
        });
    });

    afterEach(function () {
      updatedSndfx = {};
    });

    it('should respond with the updated sndfx', function () {
      expect(updatedSndfx.name).to.equal('Updated Sndfx');
      expect(updatedSndfx.info).to.equal('This is the updated sndfx!!!');
    });

  });

  describe('DELETE /api/sndfxs/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      request(app)
        .delete('/api/sndfxs/' + newSndfx._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sndfx does not exist', function (done) {
      request(app)
        .delete('/api/sndfxs/' + newSndfx._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
