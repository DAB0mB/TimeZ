
import React from 'react';
import TimezonesList from './TimezonesList';
import TimezonesNavBar from './TimezonesNavBar';

export default ({ fetchTimezones, createTimezone, removeTimezone, timezones, roles }) => (
  <div>
    <TimezonesNavBar label="Timezones" screen="timezones/main" roles={roles} />
    <TimezonesList timezones={timezones}
      fetchTimezones={fetchTimezones}
      createTimezone={createTimezone}
      removeTimezone={removeTimezone}
    />
  </div>
);
