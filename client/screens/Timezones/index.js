
import React from 'react';
import TimezonesNavBar from './components/TimezonesNavBar';
import Container from './Container';

export default (props) => (
  <div>
    <TimezonesNavBar label="Timezones" screen="timezones/main" />
    <Container userId={props.params.userId} />
  </div>
);
