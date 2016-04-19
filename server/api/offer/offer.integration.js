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
    var offers;

    beforeEach(function(done) {
      request(app)
        .get('/api/offers?longitude=8.5276642&latitude=47.3547855')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          offers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(offers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/offers', function() {
    beforeEach(function(done) {
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
          done();
        });
    });

    it('should respond with the newly created offer', function() {
      expect(newOffer.name).to.equal('New Offer');
      expect(newOffer.description).to.equal('This is the brand new offer!!!');
    });

  });

  describe('GET /api/offers/:id', function() {
    var offer;

    beforeEach(function(done) {
      request(app)
        .get('/api/offers/' + newOffer._id)
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

    afterEach(function() {
      offer = {};
    });

    it('should respond with the requested offer', function() {
      expect(offer.name).to.equal('New Offer');
      expect(offer.description).to.equal('This is the brand new offer!!!');
    });

  });

  describe('PUT /api/offers/:id', function() {
    var updatedOffer;

    beforeEach(function(done) {
      request(app)
        .put('/api/offers/' + newOffer._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Offer',
          description: 'This is the updated offer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOffer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOffer = {};
    });

    it('should respond with the updated offer', function() {
      expect(updatedOffer.name).to.equal('Updated Offer');
      expect(updatedOffer.description).to.equal('This is the updated offer!!!');
    });

  });
  
  
  describe('PUT /api/offers/:id/comment', function() {
    
    it('should respond with the updated offer containing the comment', function() {
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
