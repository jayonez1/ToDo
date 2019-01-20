import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import 'antd/dist/antd.css';


const store = configureStore();

serviceWorker.unregister();


const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class ToDoMain extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Icon type="profile" />
              <span>Лист дел</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="calendar" /><span>Календарь</span></span>}
            >
              <Menu.Item key="2">Неделя</Menu.Item>
              <Menu.Item key="3">Месяц</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Root store={store} history={history} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(
  <ToDoMain />
  , document.getElementById('root'));
