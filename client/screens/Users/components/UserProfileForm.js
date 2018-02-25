
/* eslint no-trailing-spaces: 0, react/prop-types: 0 */

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from './form.css';

class Form extends React.Component {
  static propTypes = {
    disableAll: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    fetchUser: PropTypes.func,
  }

  componentDidMount() {
    if (this.props.fetchUser) this.props.fetchUser();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <div className="container">
        <form className={style.form} onSubmit={handleSubmit}>

          <Field name="name"
            className={style.field}
            component={TextField}
            props={{
              floatingLabelText: 'Name',
              hintText: 'Your name.',
              disabled: this.props.disableAll,
              autoFocus: true,
            }}
          />
          <br />

          <Field name="username"
            className={style.field}
            component={TextField}
            props={{
              floatingLabelText: 'Username',
              hintText: 'The name you want others to know you by.',
              disabled: this.props.disableAll,
            }}
          />
          <br />

          <Field name="email"
            className={style.field}
            component={TextField}
            props={{
              floatingLabelText: 'Email',
              hintText: 'Your email address.',
              disabled: true,
            }}
          />
          <br />

          <Field name="roles"
            className={style.field}
            component={TextField}
            props={{
              floatingLabelText: 'Roles',
              hintText: 'What is the user allowed to do?',
              disabled: true,
            }}
          />
          <br />

          <div className={style.buttons}>
            <RaisedButton label={submitting ? 'Saving...' : 'Save'}
              disabled={pristine || invalid || submitting || this.props.disableAll}
              className={style.button}
              type="submit"
              primary
            />
            <RaisedButton label="Clear Values"
              disabled={pristine || submitting || this.props.disableAll}
              className={style.button}
              onTouchTap={reset}
              secondary
            />
          </div>

        </form>
      </div>
    );
  }
}

export default Form;
