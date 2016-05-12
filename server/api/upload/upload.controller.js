'use strict';
import * as auth from '../../auth/auth.service';
import swaggerdoc from './upload.swagger';
import swagger from '../../swagger';
var mime = require('mime');
var path = require('path');
var fs = require('fs');

swagger.noteEndpoint('/uploads', swaggerdoc.post, "Uploads");
// Upload File
function uploadFile(req, res, next){
    res.status(200).json(req.file.path);
}

swagger.noteEndpoint('/uploads/{filename}', swaggerdoc.get, "Uploads");
// Load file
function getFile(req, res) {
  var filePath = path.join('./uploads', req.params.id);
  var storedMimeType = mime.lookup(filePath);
  res.setHeader('Content-Type', storedMimeType)
  
  var readStream = fs.createReadStream(filePath);
  
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.status(404).send(swagger.apiError(err.toString()));
  });
}

module.exports = {
  uploadFile: uploadFile,
  getFile: getFile
};