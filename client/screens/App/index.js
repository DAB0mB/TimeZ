
import React from 'react';
import AppNavBar from './components/AppNavBar';
import TimezonesList from './components/TimezonesList';

export default () => (
  <div>
    <AppNavBar label="TimeZ" screen="app/main" />
    <TimezonesList onTimezoneAdd={() => {}} onTimezoneRemove={() => {}} />
  </div>
);
