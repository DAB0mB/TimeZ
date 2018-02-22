
const debug = require('debug')('service:timezone');
const path = require('path');
const service = require('feathers-mongodb');
const config = require('config');

const db = require('../../db');
const hooks = require('./hooks');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;
  debug('Config for timezones');

  const options = {
    Model: db.collection('timezones'),
  };

  // Initialize our service with any options it requires
  app.use('/timezones', service(options));

  // Get our initialize service to that we can bind hooks
  const timezoneService = app.service('/timezones');

  // Set up our before hooks
  timezoneService.before(hooks.before);

  // Set up our after hooks
  timezoneService.after(hooks.after);

  debug('Config complete');
};
