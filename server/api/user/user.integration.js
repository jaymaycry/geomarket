'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';

describe('User API:', function() {
  var user;
  var token;
  var adminToken;

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
  
  before(function() {
    var admin = new User({
      name: 'Fake admin',
      email: 'admin@example.com',
      password: 'password',
      role: 'admin'
    });
    
    return admin.save();
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
  
  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'admin@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  describe('GET /api/users/me', function() {

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });
  
  describe('POST /api/users/anonymous', function() {
    
    it('should respond with an anonymous user token', function(done) {
      request(app)
      .post('/auth/local')
      .send({
        email: 'admin@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.token).to.be.ok;
        done();
      });
    });
  });
});
