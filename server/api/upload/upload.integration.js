'use strict';

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

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
    return User.remove();
  });

  describe('POST /uploads', function() {
    
    it('should respond with the newly uploaded filename', function() {
      request(app)
        .post('/uploads')
        .set('authorization', 'Bearer ' + token)
        .attach('Fixture', 'server/api/upload/fixtures/example.jpg')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(200);
          console.log(res.body);
          picturePath = res.body;
          done();
        });
    });

  });

  describe('GET /uploads/:id', function() {

    it('should respond with the requested file', function() {
      request(app)
        .get('/uploads/photo-1461019342663-57154122-0ecc-4773-84cb-075ce979db8c.jpeg')//'/uploads/' + picturePath)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          offer = res.body;
          done();
        });
    });

  });
  
});
