
/* eslint new-cap: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import { replace } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { config } from './utils/config';

import AppWrapper from './screens';
import UserSignIn from './screens/Users/UserSignIn';
import UserSignUp from './screens/Users/UserSignUp';
import UserSignUpSendEmail from './screens/Users/UserSignUpSendEmail';
import UserSignUpValidateEmail from './screens/Users/UserSignUpValidateEmail';
import UserForgotPwdSendEmail from './screens/Users/UserForgotPwdSendEmail';
import UserForgotPwdReset from './screens/Users/UserForgotPwdReset';
import UserPasswordChange from './screens/Users/UserPasswordChange';
import UserEmailChange from './screens/Users/UserEmailChange';
import UserProfileChange from './screens/Users/UserProfileChange';
import UserProfile from './screens/Users/UserProfile';
import UserSignInPending from './screens/Users/UserSignInPending';
import UsersManagement from './screens/Users/UsersManagement';
import Timezones from './screens/Timezones';

// Authentication Higher Order Components to wrap route components.
const UserIsAuthenticated = UserAuthWrapper({
  // extract user data from state
  authSelector: (state /* , ownProps, boolean */) => state.auth.user,

  /* When signin is pending but not fulfilled: */
  // determine if signin is pending
  authenticatingSelector: (state /* , ownProps */) => state.auth.isLoading,
  // component to render while signin is pending
  LoadingComponent: UserSignInPending,

  /* When signin is not pending. User is authenticated or not. */
  // determine if user is authenticated
  predicate: user => user && user.isVerified,
  // route to signin component
  failureRedirectPath: '/user/signin',

  /* Once signin is successful: */
  // redirect on successful signin to component being authenticated
  allowRedirectBack: true,
  // action to dispatch to redirect
  redirectAction: replace,

  /* For documentation: */
  wrapperDisplayName: 'UserIsAuthenticated',
});

const UserIsAdmin = UserAuthWrapper({
  authSelector: (state) => state.auth.user,
  predicate: user => {
    if (!(user && user.isVerified && user.roles)) {
      return false;
    }

    return config.users.roles.allowedToChangeRoles.some(role => user.roles.indexOf(role) !== -1);
  },
  failureRedirectPath: '/user/signin',
  allowRedirectBack: false,
  // redirectAction: replace,
  wrapperDisplayName: 'UserIsAdmin',
});

// Routing
export default function (store, history) {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppWrapper}>
            <IndexRedirect to={config.client.defaultRoute} />
            <Route path={`${config.client.defaultRoute}(/:userId)`} component={UserIsAuthenticated(Timezones)} />
            <Route path="/user/signin" component={UserSignIn} />
            <Route path="/user/signup" component={UserSignUp} />
            <Route path="/user/signupsendemail" component={UserSignUpSendEmail} />
            <Route path="/user/verify/:token" component={UserSignUpValidateEmail} />
            <Route path="/user/forgotpwdsendemail" component={UserForgotPwdSendEmail} />
            <Route path="/user/forgot/:token" component={UserForgotPwdReset} />
            <Route path="/user/passwordchange(/:userId)"
              component={UserIsAuthenticated(UserPasswordChange)}
            />
            <Route path="/user/emailchange(/:userId)" component={UserIsAuthenticated(UserEmailChange)} />
            <Route path="/user/profilechange(/:userId)" component={UserIsAuthenticated(UserProfileChange)} />
            <Route path="/user/profile(/:userId)" component={UserIsAuthenticated(UserProfile)} />
            <Route path="/users"
              component={UserIsAuthenticated(UserIsAdmin(UsersManagement))}
            />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}
