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


  describe('GET /api/users/', function() {
    
    it('should respond with user list if requester has admin rights', function(done) {
      request(app)
      .get('/api/users/')
      .set('authorization', 'Bearer ' + adminToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.instanceOf(Array);
        done();
      });
    });
    
    it('should respond with 403 if requester has no admin rights', function(done) {
      request(app)
      .get('/api/users/')
      .set('authorization', 'Bearer ' + token)
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err,res) => {
        if (err) { done(err); }
        done();
      });
    });
    
  });

  describe('GET /api/users/me', function() {

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            done(err);
          }
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
    
    it('should respond with 404 when captcha isnt provided', function(done) {
      request(app)
      .post('/api/users/anonymous')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {done(err);}
        done();
      });
    });
    
  });
});
