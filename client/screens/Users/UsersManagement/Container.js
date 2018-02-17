
import { connect } from 'react-redux';
import { feathersServices } from '../../../feathers';

import UsersList from './UsersList'; // eslint-disable-line import/no-unresolved

const mapStateToProps = (state) => {
  const usersQueryResult = state.users.queryResult || {};
  const users = usersQueryResult.data || [];
  let myIndex;

  for (myIndex = 0; myIndex < users.length; myIndex++) {
    if (users[myIndex]._id == state.auth.user._id) break;
  }

  // Remove current user from the list. Unnecessary
  users.splice(myIndex, 1);

  return {
    users,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => (
    dispatch(feathersServices.users.find())
  ),
  removeUser: (user) => (
    dispatch(feathersServices.users.remove(user._id))
  ),
  toggleRole: (user, role) => {
    const roles = user.roles.slice() || [];
    const index = roles.indexOf(role);

    if (index == -1) {
      roles.push(role);
    }
    else {
      roles.splice(index, 1);
    }

    return dispatch(feathersServices.users.update(user._id, {
      $set: { roles }
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
