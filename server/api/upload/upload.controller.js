'use strict';
import * as auth from '../../auth/auth.service';
import config from '../../config/environment';
import swaggerdoc from './upload.swagger';
import swagger from '../../swagger';
import mongoose from 'mongoose';

var Grid = require('gridfs-stream');
var mime = require('mime');
var path = require('path');


swagger.noteEndpoint('/uploads', swaggerdoc.post, "Uploads");
// Upload File

function uploadFile(req, res, next){
    console.log(req);
    return res.status(200).json("/uploads/"+req.file.gridfsEntry.filename);
}

swagger.noteEndpoint('/uploads/{filename}', swaggerdoc.get, "Uploads");
// Load file
function getFile(req, res) {
  var filePath = req.params.id;

  var storedMimeType = mime.lookup(filePath);
  res.setHeader('Content-Type', storedMimeType);

  var gfs = new Grid(mongoose.connection, mongoose.mongo);

  var readStream = gfs.createReadStream(filePath);

  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    return res.status(404).send(swagger.apiError(err.toString()));
  });
}

module.exports = {
  uploadFile: uploadFile,
  getFile: getFile
};
