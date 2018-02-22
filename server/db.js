
const debug = require('debug')('server:db');
const config = require('config');
const { MongoClient } = require('mongodb');

debug('Required');

let connect;
{
  let promise;
  connect = (mongoUrl) => {
    debug('Connecting...');

    promise = promise || MongoClient.connect(mongoUrl).then((client) => {
      debug('Connected!');

      const db = client.db(`timez_${process.env.NODE_ENV}`);
      exports.__proto__ = db.__proto__;
      Object.assign(exports, db);
    });

    return promise;
  }
}

exports.connect = (mongoUrl = config.database.path) => {
  if (!mongoUrl) {
    return Promise.reject(new Error('A Mongo URL must be provided'));
  }

  return connect(mongoUrl);
};
