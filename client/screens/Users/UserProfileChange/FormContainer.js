
/* eslint no-underscore-dangle: 0 */

import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { feathersServices } from '../../../feathers';
import Form from '../components/UserProfileForm';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create({
    action: 'unique',
    value: { username: values.username },
    ownId: values.id || values._id,
    meta: { noErrMsg: true },
  }))
    .then(() => resolve())
    .catch(err => reject(err.errors));
});

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  let patch = dispatch(feathersServices.users.patch(values.id || values._id,
    { name: values.name.trim(), username: values.username.trim() }
  ));

  // Route param provided
  if (values.controlled) {
    patch = patch.then(() => {
      dispatch(push('/users'));
    });
  }
  // Route param not provided
  else {
    patch = patch.then(() => {
      dispatch(push('/user/signin')); // force user info to update
    })
    .then(() => {
      dispatch([
        feathersServices.verifyReset.resetAll(),
        feathersServices.users.reset(),
      ]);
      resolve();
    });
  }

  patch.catch(err => reject(err.errors));
});

const mapStateToProps = (state, ownProps) => {
  let user;

  if (ownProps.userId) {
    user = state.users.data || {};
  }
  else {
    user = state.auth.user;
  }

  return {
    initialValues: {
      _id: user.id || user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles: user.roles || '',
      controlled: !!ownProps.userId,
    },
    disableAll: false,
    enableReinitialize: true,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => {
    if (!ownProps.userId) return Promise.resolve();
    return dispatch(feathersServices.users.get(ownProps.userId))
  }
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserProfile',
    asyncValidate,
    asyncBlurFields: ['username'],
    validate: usersClientValidations.profileChange,
    onSubmit: handleSubmit,
  })(Form)
);
