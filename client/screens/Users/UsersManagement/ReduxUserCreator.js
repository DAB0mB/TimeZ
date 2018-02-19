
import { reduxForm, SubmissionError } from 'redux-form';
import errors from 'feathers-errors';

import { config } from '../../../utils/config';
import { feathersServices } from '../../../feathers';
import UserCreator from './UserCreator';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.verifyReset.create({
    action: 'unique',
    value: { username: values.username, email: values.email },
    meta: { noErrMsg: true },
  }))
    .then(() => resolve())
    .catch(err => reject(err.errors));
});

const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersServices.users.create(values))
    .then((result) => resolve(result))
    .catch(err => reject(err instanceof errors.BadRequest
      ? new SubmissionError(Object.assign({}, err.errors, { _error: err.message || '' }))
      : err
    ));
});

// decorate with redux
export default reduxForm({
  form: 'UserCreate',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  validate: usersClientValidations.signup,
  onSubmit: handleSubmit,
})(UserCreator);
