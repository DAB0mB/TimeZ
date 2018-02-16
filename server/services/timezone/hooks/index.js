
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    verifyHooks.restrictToVerified(),
  ],
  find: [
    associateQuery,
  ],
  get: [],
  create: [
    associateData,
  ],
  update: [
    associateQuery,
  ],
  patch: [
    associateQuery,
  ],
  remove: [
    associateQuery,
  ],
};

exports.after = {
  all: [],
  find: [],
  get: [
    (context) => {
      if (context.result.userId != context.params.user._id) {
        context.result = {};
      }
    }
  ],
  create: [],
  update: [],
  patch: [],
  remove: [],
};

function associateData(context) {
  context.data.userId = context.params.user._id;
}

function associateQuery(context) {
  context.params.query.userId = context.params.user._id;
}
