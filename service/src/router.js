import fs from 'fs'
import express from 'express'
import _ from 'lodash'

var router = express.Router();

function getDirectoryFiles(directory, callback) {
  fs.readdir(directory, function(err, files) {
    files.forEach(function(file){
      fs.stat(directory + '/' + file, function(err, stats) {
        if(stats.isFile()) {
          callback(directory + '/' + file);
        }
        if(stats.isDirectory()) {
          getDirectoryFiles(directory + '/' + file, callback);
        }
      });
    });
  });
}

getDirectoryFiles(__dirname, file => {
  _.contains(file, 'run.js') ? require(file)(router) : {};
});

export default router;
