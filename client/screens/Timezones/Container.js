
import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';

import Main from './components/Main'; // eslint-disable-line import/no-unresolved

const mapStateToProps = (state) => {
  const timezonesQueryResult = state.timezones.queryResult || {};

  return {
    timezones: timezonesQueryResult.data || [],
    roles: state.auth.user.roles || [],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTimezones: () => (
    dispatch(feathersServices.timezones.find({
      query: {
        userId: ownProps.userId,
      },
    }))
  ),
  createTimezone: (timezone) => (
    dispatch(feathersServices.timezones.create({
      ...timezone,
      userId: ownProps.userId,
    }))
  ),
  removeTimezone: (timezone) => (
    dispatch(feathersServices.timezones.remove(timezone))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
