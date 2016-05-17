'use strict';

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

var newOffer;

describe('Offer API:', function() {
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
  
  describe('GET /api/offers when latitude and longitude parameters are set', function() {

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/offers?longitude=8.5276642&latitude=47.3547855')
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
    
    it('should respond with 400 if no longitude or latitude was set', function(done) {
      request(app)
        .get('/api/offers')
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  describe('POST /api/offers', function() {

    it('should respond with the newly created offer', function(done) {
      request(app)
        .post('/api/offers')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Offer',
          description: 'This is the brand new offer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOffer = res.body;
          expect(newOffer.name).to.equal('New Offer');
          expect(newOffer.description).to.equal('This is the brand new offer!!!');
          done();
        });

    });
    
    
    it('should respond with 401 if not authorized', function(done) {
      request(app)
        .post('/api/offers')
        .send({
          name: 'New Offer 2',
          description: 'This is the second brand new offer!!!'
        })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });

    });

  });

  describe('GET /api/offers/:id', function() {

    it('should respond with the requested offer', function(done) {
      request(app)
        .get('/api/offers/' + newOffer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.name).to.equal('New Offer');
          expect(res.body.description).to.equal('This is the brand new offer!!!');
          done();
        });
    });
    
    it('should respond 404 when provided a wrong offer id', function(done) {
      request(app)
        .get('/api/offers/ffffffffffffffffffffffff')
        .expect(404)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    
    it('should respond 500 when provided an incorrect id length', function(done) {
      request(app)
        .get('/api/offers/gagabubu')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });
  
  
  describe('PUT /api/offers/:id/comment', function() {
    this.timeout(10000);
  
    it('should respond with the updated offer containing the comment', function(done) {
      request(app)
        .put('/api/offers/' + newOffer._id + '/comment')
        .set('authorization', 'Bearer ' + token)
        .send({
          text: "This is the first comment!"
        })
        .expect(200)
        .end((err, res) =>  {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 400 when body has no text.', function(done) {
      request(app)
        .put('/api/offers/' + newOffer._id + '/comment')
        .set('authorization', 'Bearer ' + token)
        .send({})
        .expect(400)
        .end((err, res) =>  {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    
    it('should respond with 401 when not authorized.', function(done) {
      request(app)
        .put('/api/offers/' + newOffer._id + '/comment')
        .send({
          text: "This is the second comment!"
        })
        .expect(401)
        .end((err, res) =>  {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when the offer was not found.', function(done) {
      request(app)
        .put('/api/offers/ffffffffffffffffffffffff/comment')
        .set('authorization', 'Bearer ' + token)
        .send({
          text: "This is the first comment!"
        })
        .expect(404)
        .end((err, res) =>  {
          if (err) {
            return done(err);
          }
          done();
        });
    });
   
    it('should respond with 500 when id length is wrong.', function(done) {
      request(app)
        .put('/api/offers/gagabubu/comment')
        .set('authorization', 'Bearer ' + token)
        .send({
          text: "This is the first comment!"
        })
        .expect(500)
        .end((err, res) =>  {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });
  
  describe('GET /api/offers/my', function() {

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/offers/my')
        .set('authorization', 'Bearer ' + token)
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
    
    it('should respond with 401 if not authorized', function(done) {
      request(app)
        .get('/api/offers/my')
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    
  });

  describe('DELETE /api/offers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/offers/' + newOffer._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when offer does not exist', function(done) {
      request(app)
        .delete('/api/offers/' + newOffer._id)
        .set('authorization', 'Bearer ' + token)
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
