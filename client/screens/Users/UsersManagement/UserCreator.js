
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from './style.css';
import formStyle from '../components/form.css';

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    afterSubmit: PropTypes.func,
  }

  render() {
    const { afterSubmit, pristine, reset, submitting, invalid } = this.props;

    const handleSubmit = (...args) => {
      this.props.handleSubmit(...args).then((result) => {
        reset();

        if (afterSubmit) {
          afterSubmit(result);
        }
      });
    };

    return (
      <form className={style.form} onSubmit={handleSubmit}>

        <Field name="name"
          component={TextField}
          props={{ floatingLabelText: 'Name', hintText: 'Your full name.', autoFocus: true }}
        />
        <br />

        <Field name="username"
          component={TextField}
          props={{
            floatingLabelText: 'Username', hintText: 'The name you want others to know you by.',
          }}
        />
        <br />

        <Field name="email"
          component={TextField}
          props={{ floatingLabelText: 'Email', hintText: 'Your email address.' }}
        />
        <br />

        <Field name="password"
          component={TextField}
          props={{ floatingLabelText: 'Password', type: 'password' }}
        />
        <br />

        <Field name="confirmPassword"
          component={TextField}
          props={{ floatingLabelText: 'Confirm password', type: 'password' }}
        />
        <br />

        <div>
          <RaisedButton label={submitting ? 'Creating User...' : 'Create User'}
            className={formStyle.button}
            disabled={pristine || invalid || submitting}
            className={formStyle.button}
            type="submit"
            primary
          />
          <RaisedButton label="Clear Values"
            className={formStyle.button}
            disabled={pristine || submitting}
            className={formStyle.button}
            onTouchTap={reset}
            secondary
          />
        </div>

      </form>
    );
  }
}

export default Form;
