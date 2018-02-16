
import React from 'react';
import TimezonesNavBar from './components/TimezonesNavBar';
import Container from './Container';

export default () => (
  <div>
    <TimezonesNavBar label="Timezones" screen="timezones/main" />
    <Container />
  </div>
);
