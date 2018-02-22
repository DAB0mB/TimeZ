
const debug = require('debug')('service:message');
const path = require('path');
const service = require('feathers-mongodb');
const config = require('config');

const db = require('../../db');
const hooks = require('./hooks');

debug('Required');

module.exports = function () {
  const app = this;
  debug('Config for messages');

  const options = {
    Model: db.collection('messages'),
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);

  debug('Config complete');
};
