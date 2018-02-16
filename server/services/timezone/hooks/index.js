
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
      const user = context.params.user;
      const result = context.result;

      if (!user.roles.includes('superAdmin') && result.userId != user._id) {
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
  const user = context.params.user;
  const data = context.data;

  if (!user.roles.includes('superAdmin') || !data.userId) {
    data.userId = user._id;
  }
}

function associateQuery(context) {
  const user = context.params.user;
  const query = context.params.query;

  if (!user.roles.includes('superAdmin') || !query.userId) {
    query.userId = user._id;
  }
}
