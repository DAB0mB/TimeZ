
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';
import EditIcon from 'material-ui/svg-icons/image/edit';
import PersonIcon from 'material-ui/svg-icons/social/person';

import style from './style.css';

class UserItem extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    controllerUser: PropTypes.object.isRequired,
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
    const { controllerUser } = this.props;
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
        {controllerUser.roles.includes('superAdmin') && (
          <td className={style.checkbox}>
            <Checkbox label="super admin"
              className={style.checkbox}
              checked={roles.includes('superAdmin')}
              onCheck={this.toggleRole.bind(this, 'superAdmin')}
            />
          </td>
        )}
        <td className={style.fnButton}>
          <IconButton onClick={this.removeUser.bind(this)} >
            <RemoveCircleIcon />
          </IconButton>
        </td>
        <td className={style.fnButton}>
          <IconButton >
            <Link to={`/user/profile/${_id}`}>
              <PersonIcon />
            </Link>
          </IconButton>
        </td>
        <td className={style.fnButton}>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem
              containerElement={<Link to={`/user/passwordchange/${_id}`} />}
              primaryText="Change password"
            />
            <MenuItem
              containerElement={<Link to={`/user/emailchange/${_id}`} />}
              primaryText="Change email address"
            />
            <MenuItem
              containerElement={<Link to={`/user/profilechange/${_id}`} />}
              primaryText="Change profile"
            />
            {controllerUser.roles.includes('superAdmin') && (
              <MenuItem
                containerElement={<Link to={`/timezones/${_id}`} />}
                primaryText="Change timezones"
              />
            )}
          </IconMenu>
        </td>
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
