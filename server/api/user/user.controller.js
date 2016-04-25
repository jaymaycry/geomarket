'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import swagger from '../../swagger';
import swaggerdoc from './user.swagger';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).send(swagger.apiError(err.toString()));
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(swagger.apiError(err.toString()));
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
swagger.noteEndpoint('/api/users', swaggerdoc.index, "User");
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
swagger.noteEndpoint('/api/users', swaggerdoc.create, "User");
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
swagger.noteEndpoint('/api/users/{id}', swaggerdoc.show, "User");
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).send(swagger.apiError("User not found."));
      }
      res.json(user.profile);
    })
    .catch(handleError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
swagger.noteEndpoint('/api/users/{id}', swaggerdoc.destroy, "User");
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).send(swagger.apiMessage("User deleted."));
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
swagger.noteEndpoint('/api/users/{id}/password', swaggerdoc.changePassword, "User");
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).send(swagger.apiMessage("Password changed."));
          })
          .catch(validationError(res));
      } else {
        return res.status(403).send(swagger.apiError("Authentication failed."));
      }
    });
}

/**
 * Get my info
 */
swagger.noteEndpoint('/api/users/me', swaggerdoc.me, "User");
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).send(swagger.apiError("Not logged in."));
      }
      res.status(200).json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
