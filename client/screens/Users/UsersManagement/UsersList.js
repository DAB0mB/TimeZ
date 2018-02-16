
import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import UserItem from './UserItem';

import style from './style.css';

export class UsersList extends React.Component {
  static propTypes = {
    users: PropTypes.array,
    fetchUsers: PropTypes.func.isRequired,
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

    const users = this.state.users.filter(({ username }) => {
      return username.match(pattern);
    });

    return (
      <div className={style.list}>
        <TextField name="username"
          value={pattern}
          onChange={({ target }) => this.setState({ pattern: target.value }) }
          floatingLabelText="Filter"
          hintText="Filter users by username."
          autoComplete="off"
        />

        <list>
          {users.map((user, i) => (
            <UserItem key={i} user={user} />
          ))}
        </list>
      </div>
    );
  }
}

export default UsersList;
