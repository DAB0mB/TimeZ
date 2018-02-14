
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import style from './style.css';

const gmtDiffOptions = [];

for (let i = -12; i <= 12; i++) {
  const sign = i < 0 ? '-' : i > 0 ? '+' : '';

  gmtDiffOptions.push(
    <MenuItem key={i} value={i} primaryText={`GMT ${sign}${Math.abs(i)}`} />
  );
}

export class TimezoneCreator extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    city: '',
    diff: 0,
  }

  render() {
    const { name, city, diff } = this.state;
    const canCreateTimezone = name && city && diff != null;

    return (
      <div className={style.creator}>

        <TextField name="name"
          className={style.input}
          value={name}
          onChange={({ target }) => this.setState({ name: target.value }) }
          onKeyDown={canCreateTimezone && onKeyDown.bind(this)}
          floatingLabelText="Name"
          hintText="The timezone name."
          autoFocus={true}
        />
        <TextField name="city"
          className={style.input}
          value={city}
          onChange={({ target }) => this.setState({ city: target.value }) }
          onKeyDown={canCreateTimezone && onKeyDown.bind(this)}
          floatingLabelText="City"
          hintText="The timezone city."
          autoFocus={false}
        />
        <SelectField name="diff"
          className={style.input}
          value={diff}
          onChange={(e, i, v) => this.setState({ diff: v }) }
          onKeyDown={canCreateTimezone && onKeyDown.bind(this)}
          floatingLabelText="Diff"
          hintText="The timezone diff."
          autoFocus={false}
        >
          {gmtDiffOptions}
        </SelectField>
        <br />

        <div>
          <RaisedButton label="Create timezone"
            onClick={this.createTimezone.bind(this)}
            disabled={!canCreateTimezone}
            className={style.button}
            type="submit"
            primary
          />
        </div>

      </div>
    );
  }

  createTimezone() {
    const { onCreate } = this.props;
    const timezone = { ...this.state };

    this.setState({
      name: '',
      city: '',
      diff: 0,
    });

    onCreate(timezone);
  }
}

function onKeyDown({ key }) {
  if (key == 'Enter') {
    this.createTimezone();
  }
}

export default TimezoneCreator;
