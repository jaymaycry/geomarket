'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./offer.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
// Comment controllers
router.put('/:id/comment', auth.isAuthenticated(), controller.commentController);

module.exports = router;
