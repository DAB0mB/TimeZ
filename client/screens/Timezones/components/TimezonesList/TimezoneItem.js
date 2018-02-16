
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';

import style from './style.css';

const instances = [];

// Setting a global interval so all instances would be updated at the same time
setInterval(() => {
  instances.forEach(instance => instance.updateTime());
}, 1000);

class TimezoneItem extends React.Component {
  static propTypes = {
    timezone: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      diff: PropTypes.string.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.numericDiff = Number(props.timezone.diff.substr(3));
    this.state = {};

    this.updateTime(true);
  }

  componentDidMount() {
    // Will start auto-updating time
    instances.push(this);
  }

  componentWillUnmount() {
    // Will stop from auto-updating time
    const index = instances.indexOf(this);
    instances.splice(index, 1);
  }

  render() {
    const { timezone, onRemove } = this.props;

    return (
      <tr className={style.item}>
        <td className={style.label}>{timezone.name}</td>
        <td className={style.label}>{timezone.city}</td>
        <td className={style.label}>{timezone.diff}</td>
        <td className={style.label}>{this.state.time}</td>
        <td>
          <IconButton className={style.removeButton} onClick={onRemove.bind(null, timezone._id)}>
            <RemoveCircleIcon />
          </IconButton>
        </td>
      </tr>
    );
  }

  updateTime(initial) {
    const geoDate = new Date();
    const gmtDate = new Date(
      geoDate.getTime() +
      geoDate.getTimezoneOffset() * 60 * 1000 +
      this.numericDiff * 60 * 60 * 1000
    );

    const time = `${gmtDate.getHours()}:${gmtDate.getMinutes()}:${gmtDate.getSeconds()}`;

    if (initial) {
      this.state.time = time;
    }
    else {
      this.setState({ time });
    }
  }
}

export default TimezoneItem;
