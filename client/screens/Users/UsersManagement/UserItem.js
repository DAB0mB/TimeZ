
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';
import EditIcon from 'material-ui/svg-icons/image/edit';

import style from './style.css';

class UserItem extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired,
    toggleRole: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  render() {
    const { user } = this.state;
    const { roles, username, _id } = user;

    return (
      <tr className={style.item}>
        <td className={style.username}>{username}</td>
        <td className={style.checkbox}>
          <Checkbox label="admin"
            className={style.checkbox}
            checked={roles.includes('admin')}
            onCheck={this.toggleRole.bind(this, 'admin')}
          />
        </td>
        {this.props.user.roles.includes('superAdmin') && (
          <td className={style.checkbox}>
            <Checkbox label="super admin"
              className={style.checkbox}
              checked={roles.includes('superAdmin')}
              onCheck={this.toggleRole.bind(this, 'superAdmin')}
            />
          </td>
        )}
        <td className={style.fnButton}>
          <IconButton className={style.removeButton} onClick={this.removeUser.bind(this)} >
            <RemoveCircleIcon />
          </IconButton>
        </td>
        {this.props.user.roles.includes('superAdmin') && (
          <td className={style.fnButton}>
            <Link to={`/timezones/${_id}`}>
              <IconButton className={style.editButton}><EditIcon /></IconButton>
            </Link>
          </td>
        )}
      </tr>
    );
  }

  toggleRole(role) {
    this.props.toggleRole(this.state.user, role).then(({ value }) => {
      this.setState({
        user: value
      });
    });
  }

  removeUser() {
    this.props.removeUser(this.state.user);
  }
}

export default UserItem;
