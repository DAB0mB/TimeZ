
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import FormContainer from './FormContainer.js';

const Page = (props) => (
  <div>
    <UsersNavBar label="Change Email"
      screen="user/emailchange"
      controlled={!!props.params.userId}
    />
    <FormContainer userId={props.params.userId} />
  </div>
);

export default Page;
