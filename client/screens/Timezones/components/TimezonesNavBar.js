
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'; // eslint-disable-line no-unused-vars
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import MessageBar from '../../components/MessageBar';

export const TimezonesNavBar = ({ label, screen, message, roles, showBackButton }) => (
  <div>
    <AppBar
      title={<span>{label}</span>}
      iconElementLeft={makeBackButton(showBackButton)}
      iconElementRight={makeBarButtons(screen, roles, showBackButton)}
    />
    <MessageBar message={message} />
  </div>
);

TimezonesNavBar.propTypes = {
  label: PropTypes.string.isRequired, // Nav bar label
  screen: PropTypes.string.isRequired, // nav bar is for this patch, determines options shown
  username: PropTypes.any,
  message: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
};

const makeBarButtons = (screen, roles, showBackButton) => {
  if (showBackButton) return <div />;

  switch (screen) {
    /*
     Material-ui 0.14.x is not yet compatible with React 15, and React issues this warning:
     Warning: IconButton: `ref` is not a prop. Trying to access it will result in `undefined`
     being returned. If you need to access the same value within the child component, you should
     pass it as a different prop.
     */
    case 'timezones/main':
      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            containerElement={<Link to="/user/signin" />}
            primaryText="Sign out"
          />
          <MenuItem
            containerElement={<Link to="/user/profile" />}
            primaryText="User profile"
          />
          {roles.length && (
            <MenuItem
              containerElement={<Link to="/users" />}
              primaryText="Users"
            />
          )}
        </IconMenu>
      );

    default: {
      return (
        <div />
      );
    }
  }
};

const makeBackButton = (showBackButton) => {
  if (!showBackButton) return <div />;

  return (
    <Link to="/users">
      <IconButton><ArrowBackIcon /></IconButton>
    </Link>
  );
};

export default TimezonesNavBar;
