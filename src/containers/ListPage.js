import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '../components/List';
import * as listAction from '../actions/listAction';

function mapStateToProps(state) {
  return {
    list: state.list,
    tasks: state.listTasksOnDays,
    form: state.listForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(listAction, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
