
import React, { PropTypes } from 'react';
import TimezoneCreator from './TimezoneCreator';
import TimezoneItem from './TimezoneItem';

import style from './style.css';

export class TimezonesList extends React.Component {
  static propTypes = {
    timezones: PropTypes.array,
    onTimezoneAdd: PropTypes.func.isRequired,
    onTimezoneRemove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    timezones: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      timezones: props.timezones
    };
  }

  render() {
    return (
      <div>
        <TimezoneCreator onCreate={this.addTimezone.bind(this)} />

        <table className={style.table}>
          {this.state.timezones.map((timezone, i) => (
            <TimezoneItem key={i}
                          timezone={timezone}
                          onRemove={this.removeTimezone.bind(this, i)} />
          ))}
        </table>
      </div>
    );
  }

  addTimezone(timezone) {
    this.state.timezones.push(timezone);
    this.forceUpdate();
  }

  removeTimezone(i) {
    this.state.timezones.splice(i, 1);
    this.forceUpdate();
  }
}

export default TimezonesList;
