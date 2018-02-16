
import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import TimezoneCreator from './TimezoneCreator';
import TimezoneItem from './TimezoneItem';

import style from './style.css';

export class TimezonesList extends React.Component {
  static propTypes = {
    timezones: PropTypes.array,
    createTimezone: PropTypes.func.isRequired,
    removeTimezone: PropTypes.func.isRequired,
    fetchTimezones: PropTypes.func.isRequired,
  }

  static defaultProps = {
    timezones: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      timezones: props.timezones,
      pattern: '',
    };
  }

  componentDidMount() {
    this.props.fetchTimezones();
  }

  componentWillReceiveProps(props) {
    const state = {};

    if ('timezones' in props) {
      state.timezones = props.timezones;
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  render() {
    const { pattern } = this.state;

    const timezones = this.state.timezones.filter(({ name }) => {
      return name.match(pattern);
    });

    return (
      <div>
        <TimezoneCreator onCreate={this.createTimezone.bind(this)} />

        <TextField name="name"
          value={pattern}
          onChange={({ target }) => this.setState({ pattern: target.value }) }
          floatingLabelText="Filter"
          hintText="Filter timezones by name."
          autoComplete="off"
        />

        <table className={style.table}>
          <tbody>
            {timezones.map((timezone, i) => (
              <TimezoneItem key={i}
                timezone={timezone}
                onRemove={this.removeTimezone.bind(this)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  createTimezone(timezone) {
    this.props.createTimezone(timezone).then(({ value }) => {
      this.state.timezones.push(value);
      this.forceUpdate();
    });
  }

  removeTimezone(_id) {
    this.props.removeTimezone(_id).then(() => {
      let i;

      for (i = 0; i < this.state.timezones.length; i++) {
        if (this.state.timezones[i]._id == _id) break;
      }

      this.state.timezones.splice(i, 1);
      this.forceUpdate();
    });
  }
}

export default TimezonesList;
