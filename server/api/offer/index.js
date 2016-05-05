'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./offer.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.put('/:id/comment', auth.isAuthenticated(), controller.addComment);

module.exports = router;
