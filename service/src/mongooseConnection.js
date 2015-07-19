import mongoose from 'mongoose';

//mongodb://usuar:senha@host:port
var usuario = '';
var senha =  '';
var porta = '';
var host = 'localhost';
var base = 'goBike';
var stringConnection = "mongodb://" + usuario + senha + host + porta + "/" + base;

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
  host = process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PORT;


}

mongoose.connect(stringConnection);

var db = mongoose.connection;

db.once('open', () => console.log('Mongoose connection open.', stringConnection));
db.on('error', error => console.log('Mongoose error', error));