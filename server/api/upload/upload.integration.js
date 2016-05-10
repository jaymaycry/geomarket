'use strict';

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

import mongoose from 'mongoose';
var Grid = require('gridfs-stream');

var picturePath;

describe('Upload API:', function() {
  var user;
  var token;
  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
  });

  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Clear users after testing
  after(function() {

    // raw mongoose cleaning statements
    User.db.db.dropCollection('fs.files');
    User.db.db.dropCollection('fs.chunks');

    // the more elegant (but not working) GridFS StreamFile method
    //var gfs = new Grid(mongoose.connection, mongoose.mongo);
    //gfs.remove({
    //  filename: 'example.jpg'
    //}, function (err) {
    //  if (err) return handleError(err);
    //  console.log('success');
    //});

    return User.remove();


  });

  describe('POST /uploads', function() {

    it('should respond with the newly uploaded filename', function(done) {
      this.timeout(10000);

      request(app)
        .post('/uploads')
        .attach('photo', 'server/api/upload/fixtures/example.jpg')
        .set('authorization', 'Bearer ' + token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(200);
          picturePath = res.body;
          done();
        });
    });

  });

  describe('GET /uploads/:id', function() {

    it('should respond with the requested file', function(done) {
      this.timeout(10000);
      request(app)
        .get('/uploads/' + picturePath)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
