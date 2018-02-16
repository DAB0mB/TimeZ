
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
