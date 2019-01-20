import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Week extends Component {
  render() {
    const {week, nextWeek, switchTabs} = this.props;

    return (
      <div>
        <p>Неделя с { week.firstWeekDate } по { week.lastWeekDate }</p>
        <button
          onClick={ () =>
            nextWeek({
              first: week.firstWeekDate,
              last: week.lastWeekDate
            })
          }
        >След. неделя</button>
        <Tabs activeKey={ week.selectDay.toString() } onTabClick={  (tabId) => switchTabs(tabId)  }>
          <TabPane tab="Понедельник" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="Вторник" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Среда" key="3">Content of Tab Pane 3</TabPane>
          <TabPane tab="Четверг" key="4">Content of Tab Pane 3</TabPane>
          <TabPane tab="Пятница" key="5">Content of Tab Pane 3</TabPane>
          <TabPane tab="Суббота" key="6">Content of Tab Pane 3</TabPane>
          <TabPane tab="Воскресение" key="7">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Week;
