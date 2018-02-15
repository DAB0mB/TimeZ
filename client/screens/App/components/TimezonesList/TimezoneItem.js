
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';

import style from './style.css';

export const TimezoneItem = ({ timezone, onRemove }) => (
  <tr className={style.item}>
    <td className={style.label}>{timezone.name}</td>
    <td className={style.label}>{timezone.city}</td>
    <td className={style.label}>{timezone.diff}</td>
    <td>
      <IconButton className={style.removeButton} onClick={onRemove}>
        <RemoveCircleIcon />
      </IconButton>
    </td>
  </tr>
);

TimezoneItem.propTypes = {
  timezone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    diff: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TimezoneItem;
