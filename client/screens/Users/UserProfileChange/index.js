
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer';

export default (props) => (
  <div>
    <UsersNavBar label="Change Profile"
      screen="user/profilechange"
      controlled={!!props.params.userId}
    />
    <FormContainer userId={props.params.userId} />
  </div>
);
