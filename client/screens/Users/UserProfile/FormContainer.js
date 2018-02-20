
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { feathersServices } from '../../../feathers';

import Form from '../components/UserProfileForm';

const handleSubmit = () => new Promise((resolve) => resolve());

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
      name: user.name, username: user.username, email: user.email, roles: user.roles || '',
    },
    disableAll: true,
    enableReinitialize: true,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser() {
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
    onSubmit: handleSubmit,
  })(Form)
);
