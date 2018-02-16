
import React from 'react';
import TimezonesNavBar from './components/TimezonesNavBar';
import Container from './Container';

export default (props) => (
  <div>
    <Container userId={props.params.userId} />
  </div>
);
