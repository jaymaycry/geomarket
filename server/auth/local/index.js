'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
import swagger from '../../swagger';
import swaggerdoc from './local.swagger';

var router = express.Router();

swagger.noteEndpoint('/auth/local', swaggerdoc.post, "Authentication");
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(swagger.apiError(error.toString()));
    }
    if (!user) {
      return res.status(404).json(swagger.apiError("Something went wrong, please try again."));
    }

    var token = signToken(user._id, user.role);
    res.status(200).json({ token });
  })(req, res, next)
});

export default router;
