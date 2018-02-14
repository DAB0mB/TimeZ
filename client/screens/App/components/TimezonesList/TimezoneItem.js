
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';

import style from './style.css';

export const TimezoneItem = ({ timezone, onRemove }) => (
  <div className={style.item}>
    <div className={style.label}>name: {timezone.name}</div>
    <div className={style.label}>city: {timezone.city}</div>
    <div className={style.label}>diff: {timezone.diff}</div>
    <IconButton className={style.removeButton} onClick={onRemove}>
      <RemoveCircleIcon />
    </IconButton>
  </div>
);

TimezoneItem.propTypes = {
  timezone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    diff: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TimezoneItem;
