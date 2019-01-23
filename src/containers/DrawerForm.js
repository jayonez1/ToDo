import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DrawerForm from '../components/DrawerForm';
import * as drawerFormActions from '../actions/drawerFormActions';

function mapStateToProps(state) {
  return {
    driwerForm: state.driwerForm,
    formNotification: state.formNotification
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(drawerFormActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerForm);
