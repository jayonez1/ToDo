import React from 'react';
import { Drawer, notification } from 'antd';

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
          title={(this.props.nameForm) ? this.props.nameForm : ""}
          placement="right"
          closable={true}
          width={640}
          onClose={() => this.props.closeDriwerForm()}
          visible={this.props.driwerForm}
        >
          123
        </Drawer>
      </div>
    );
  }
}
export default DrawerForm
