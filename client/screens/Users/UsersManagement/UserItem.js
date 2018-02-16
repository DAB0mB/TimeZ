
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';

import style from './style.css';

const UserItem = ({ user }) => {
  const { username, _id } = user;

  return (
    <li className={style.item}>
      <div className={style.label}>{username}</div>
      <Link to={`/timezones/${_id}`}>
        <IconButton className={style.editButton}><EditIcon /></IconButton>
      </Link>
    </li>
  );
};

export default UserItem;
