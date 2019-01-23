import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
import * as tasksAction from '../actions/tasksAction';

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tasksAction, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
