import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Month from '../components/Month';
import * as monthAction from '../actions/monthAction';

function mapStateToProps(state) {
  return {
    month: state.month,
    tasks: state.monthTasksOnDay,
    form: state.monthForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(monthAction, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Month);
