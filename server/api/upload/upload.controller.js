'use strict';
import * as auth from '../../auth/auth.service';
var mime = require('mime');
var path = require('path');
var fs = require('fs');

// Upload File
function uploadFile(req, res, next){
    console.log(req.file);
    res.status(200).json(req.file.path);
}

// Load file
function getFile(req, res) {
  var filePath = path.join('./uploads', req.params.id);
  var storedMimeType = mime.lookup(filePath);
  res.setHeader('Content-Type', storedMimeType)
  fs.createReadStream(filePath).pipe(res)
}

module.exports = {
  uploadFile: uploadFile,
  getFile: getFile
};
