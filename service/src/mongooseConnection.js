import mongoose from 'mongoose';

//mongodb://usuar:senha@host:port
var usuario = '';
var senha =  '';
var host = 'localhost';
var base = 'gobike';
var stringConnection = "mongodb://" + usuario + senha + host + "/" + base;

if (process.env.PRODUCTION) {
  usuario ='gobikemaster';
  senha = ':bike!';
  host = '@gobike.herokuapp.com:59722'
}

mongoose.connect(stringConnection);

var db = mongoose.connection;

db.once('open', () => console.log('Mongoose connection open.', stringConnection));
db.on('error', error => console.log('Mongoose error', error));