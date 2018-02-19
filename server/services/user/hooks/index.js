
/* eslint no-console: 0 */
/* global require */

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;
const validateSchema = require('feathers-hooks-validate-joi');
const config = require('config');

const emailer = require('../../../helpers/emails');
const client = require('../../../../common/helpers/usersClientValidations');
const schemas = require('../../../validations/schemas');
const server = require('../../../validations/usersServerValidations');

const idName = config.database.idName;

exports.before = (app) => {
  const verifyReset = app.service('/verifyReset/:action/:value');
  const users = app.service('/users'); // eslint-disable-line no-unused-vars

  return {
    all: [],
    find: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only allow admin to list all users
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        idField: idName,
        owner: false,
      }),
      restrictAdminQuery,
    ],
    get: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can get a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
    ],
    create: [
      validateSchema.form(schemas.signup, schemas.options), // schema validation
      hooks.validateSync(client.signup),  // redo redux-form client validation
      hooks.validateUsingPromise(values => verifyReset.create( // redo redux-form async
        { action: 'unique', value: { username: values.username, email: values.email } }
      )),
      hooks.validateUsingCallback(server.signup, { app }), // server validation
      hooks.remove('confirmPassword'),
      verifyHooks.addVerification(), // set email addr verification info
      auth.hashPassword(),
      restrictAdminData,
      adminVerifyData,
    ],
    update: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can update a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
      restrictAdminQuery,
      restrictAdminData,
    ],
    patch: [ // client route /user/rolechange patches roles. todo might check its an admin acct
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can get a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
      restrictAdminQuery,
      restrictAdminData,
    ],
    remove: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can remove a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
      restrictAdminQuery,
    ],
  };
};

exports.after = {
  find: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  get: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
    restrictAdminResult,
  ],
  create: [
    hooks.remove('password'),
    emailVerification, // send email to verify the email addr
    verifyHooks.removeVerification(),
  ],
  update: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  patch: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  remove: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
};

function adminVerifyData(hook) {
  if (hook.params.user && hook.params.user.roles &&
      hook.params.user.roles.length) {
    // Skip verification if an admin wants to create a user
    hook.data.isVerified = true;
  }
}

function adminVerifyResult(hook) {
  if (hook.params.user && hook.params.user.roles &&
      hook.params.user.roles.length) {
    // Skip verification if an admin wants to create a user
    hook.result.isVerified = true;
  }
}

function emailVerification(hook, next) {
  if (hook.params.user && hook.params.user.roles &&
      hook.params.user.roles.length) {
    // Skip verification if an admin wants to create a user
    return next();
  }

  const user = clone(hook.result);
  const params = hook.params;

  emailer('send', user, params, (err) => {
    next(err, hook);
  });
}

function restrictAdminQuery(context) {
  const query = context.params.query;
  const user = context.params.user;

  if (!user) return;

  // Admin will only be able to CRUD admins at most
  if (user.roles.includes('admin') &&
      !user.roles.includes('superAdmin')) {
    query.roles = { $ne: 'superAdmin' };
  }
}

function restrictAdminData(context) {
  const data = context.data;
  const user = context.params.user;

  if (!user) return;

  // An admin can't create a user a superAdmin
  if (user.roles.includes('admin') &&
     !user.roles.includes('superAdmin') &&
     data.roles && data.roles.includes('superAdmin')) {
      const index = data.roles.indexOf('superAdmin');
      data.roles.splice(index, 1);
  }
}

function restrictAdminResult(context) {
  const user = context.params.user;

  if (!user) return;

  // Admin will only be able to CRUD admins at most
  if (user.roles.includes('admin') &&
      !user.roles.includes('superAdmin') &&
      context.result.includes('superAdmin')) {
    context.result = {};
  }
}

// Helpers

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
