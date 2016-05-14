'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./upload.controller');
var multer  = require('multer');
var mime = require('mime');
var uuid = require('node-uuid');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + uuid.v4() + '.' + mime.extension(file.mimetype))
  }
})
var upload = multer({ storage: storage });
var router = express.Router();

router.get('/:id', controller.getFile);
router.post('/', [auth.isAuthenticated(), upload.single('photo')], controller.uploadFile);

module.exports = router;