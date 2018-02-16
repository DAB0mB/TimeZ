
const debug = require('debug')('service:timezone');
const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const config = require('config');

const hooks = require('./hooks');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;
  const fileName = path.join(config.database.path, 'timezones.db');
  debug(`Config for ${fileName}`);

  const db = new NeDB({
    filename: fileName,
    autoload: true,
  });

  const options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25,
    },
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
