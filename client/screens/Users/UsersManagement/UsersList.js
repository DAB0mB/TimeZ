
import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import ReduxUserCreator from './ReduxUserCreator';
import UserItem from './UserItem';

import style from './style.css';

export class UsersList extends React.Component {
  static propTypes = {
    users: PropTypes.array,
    fetchUsers: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    toggleRole: PropTypes.func.isRequired,
  }

  static defaultProps = {
    users: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      users: props.users,
      pattern: '',
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(props) {
    const state = {};

    if ('users' in props) {
      state.users = props.users;
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  render() {
    const { pattern } = this.state;
    const { controllerUser } = this.props;

    const users = this.state.users.filter(({ username }) => {
      return username.match(pattern);
    });

    return (
      <div className={style.list}>
        <ReduxUserCreator afterSubmit={this.afterSubmit.bind(this)} />

        <TextField name="username"
          className={style.filter}
          value={pattern}
          onChange={({ target }) => this.setState({ pattern: target.value }) }
          floatingLabelText="Filter"
          hintText="Filter users by username."
          autoComplete="off"
        />

        <table className={style.table}>
          <thead className={style.head}>
            <tr>
              <td>username</td>
              <td>roles</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem key={user.username}
                user={user}
                controllerUser={controllerUser}
                toggleRole={this.toggleRole.bind(this)}
                removeUser={this.removeUser.bind(this)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  toggleRole(user, role) {
    return this.props.toggleRole(user, role);
  }

  removeUser(user) {
    return this.props.removeUser(user).then(() => {
      let i;

      for (i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i]._id == user._id) break;
      }

      this.state.users.splice(i, 1);
      this.forceUpdate();
    });
  }

  afterSubmit({ value }) {
    this.state.users.push(value);
    this.forceUpdate();
  }
}

export default UsersList;
