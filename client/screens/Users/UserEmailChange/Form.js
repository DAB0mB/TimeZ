
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../components/form.css';

const Form = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <form className={style.form} onSubmit={handleSubmit}>

      {!props.controlled && (
        <span>
          <Field name="password"
            className={style.field}
            component={TextField}
            props={{
              floatingLabelText: 'Password',
              hintText: 'Your password.',
              autoFocus: true,
            }}
          />
          <br />
        </span>
      )}

      <Field name="email"
        className={style.field}
        component={TextField}
        props={{ floatingLabelText: 'Email', hintText: 'Your new email address.' }}
      />
      <br />

      <Field name="confirmEmail"
        className={style.field}
        component={TextField}
        props={{ floatingLabelText: 'Confirm email', hintText: 'Enter your new email again.' }}
      />
      <br />

      <div className={style.buttons}>
        <RaisedButton label={submitting ? 'Changing email...' : 'Change email'}
          className={style.button}
          disabled={pristine || invalid || submitting}
          className={style.button}
          type="submit"
          primary
        />
        <RaisedButton label="Clear Values"
          className={style.button}
          disabled={pristine || submitting}
          className={style.button}
          onTouchTap={reset}
          secondary
        />
      </div>

    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Form;
