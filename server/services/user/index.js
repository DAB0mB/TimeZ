
const debug = require('debug')('service:user');
const path = require('path');
const service = require('feathers-mongodb');
const config = require('config');

const db = require('../../db');
const hooks = require('./hooks');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;
  debug(`Config for users`);

  const options = {
    Model: db.collection('users'),
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before(app));

  // Set up our after hooks
  userService.after(hooks.after);

  debug('Config complete');
};
