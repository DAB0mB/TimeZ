
import React from 'react';
import TimezonesList from './TimezonesList';
import TimezonesNavBar from './TimezonesNavBar';

export default ({
  fetchTimezones,
  createTimezone,
  removeTimezone,
  timezones,
  roles,
  userId,
}) => (
  <div>
    <TimezonesNavBar label="Timezones"
      screen="timezones/main"
      roles={roles}
      showBackButton={!!userId}
    />
    <TimezonesList timezones={timezones}
      fetchTimezones={fetchTimezones}
      createTimezone={createTimezone}
      removeTimezone={removeTimezone}
    />
  </div>
);
