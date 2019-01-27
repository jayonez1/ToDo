import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import App from './containers/App';
import WeekPage from './containers/WeekPage';
import MonthPage from './containers/MonthPage';
import ListPage from './containers/ListPage';

import routes from "./constants/routes.json"

import {
  Layout, Menu, Icon,
} from 'antd';

const {
  Content, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class Routers extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <App>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" mode="inline">
              <Menu.Item key="Лист дел">
                <Link to={routes.LIST}>
                  <Icon type="profile" />
                  <span>Лист задачь</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="calendar" /><span>Календарь</span></span>}
              >
                <Menu.Item key="Неделя"><Link to={routes.WEEK}>Неделя</Link></Menu.Item>
                <Menu.Item key="Месяц"><Link to={routes.MONTH}>Месяц</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>

            <Content style={{ margin: '16px 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                  <Route path={routes.WEEK} component={WeekPage} />
                  <Route path={routes.MONTH} component={MonthPage} />
                  <Route path={routes.LIST} component={ListPage} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </App>
    );
  }
}

export default Routers
