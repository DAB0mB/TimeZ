
import { connect } from 'react-redux';
import { feathersServices, feathersAuthentication } from '../../feathers';

import TimezonesList from './components/TimezonesList'; // eslint-disable-line import/no-unresolved

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones.queryResult || [],
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

export default connect(mapStateToProps, mapDispatchToProps)(TimezonesList);
