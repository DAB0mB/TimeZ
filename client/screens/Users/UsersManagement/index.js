
import React from 'react';
import UsersNavBar from '../components/UsersNavBar';
import Container from './Container';

export default () => (
  <div>
    <UsersNavBar label="Manage Users" screen="users" />
    <Container />
  </div>
);
