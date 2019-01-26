import React from 'react';
import { Drawer, notification } from 'antd';
import FormDefault from './FormDefault'

class DrawerForm extends React.PureComponent {

  // Всплывающие подсказки
  openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: (message) ? message : null,
      description: (description) ? description : null,
    });
    this.props.notificationReset()
  };


  render() {
    const { formNotification } = this.props;
    if (formNotification.open) {
      this.openNotificationWithIcon(formNotification.type, formNotification.message, formNotification.description)
    }
    return (
      <div>
        <Drawer
          title={(this.props.dataSource.nameForm) ? this.props.dataSource.nameForm : ""}
          placement="right"
          closable={true}
          width={400}
          onClose={() => this.props.closeDriwerForm()}
          visible={this.props.driwerForm}
        >
          <FormDefault {...this.props} />
        </Drawer>
      </div>
    );
  }
}
export default DrawerForm
