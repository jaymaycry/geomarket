'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var multer  = require('multer');
var mime = require('mime');
var path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
})
var upload = multer({ storage: storage });

var router = express.Router();

// Upload file
router.post('/', upload.single('photo'), function (req, res, next){
    console.log(req.file);
    res.json(req.file.path);
});

// Load file
router.get('/:id', function (req, res) {
  var filePath = path.join('./uploads', req.params.id);
  var storedMimeType = mime.lookup(filePath);
  res.setHeader('Content-Type', storedMimeType)
  fs.createReadStream(filePath).pipe(res)
})

module.exports = router;
