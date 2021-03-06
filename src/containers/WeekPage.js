import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Week from '../components/Week';
import * as weekActions from '../actions/weekAction';

function mapStateToProps(state) {
  return {
    week: state.week,
    tasks: state.weekTasksOnDay,
    form: state.weekForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(weekActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Week);
