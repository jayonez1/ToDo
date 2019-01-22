import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Week extends Component {
  render() {
    const {week, nextWeek, prevWeek, resetWeek, switchTabs} = this.props;
    console.log(week.selectDay);
    return (
      <div>
        <p>Неделя с { week.firstWeekDate } по { week.lastWeekDate }</p>
        <button
          onClick={ () =>
            prevWeek({
              selectFirst: week.firstWeekDate,
              selectLast: week.lastWeekDate
            })
          }
        >Пред. неделя</button>
        <button
          onClick={ () =>
            resetWeek()
          }
        >Сбросить</button>
        <button
          onClick={ () =>
            nextWeek({
              selectFirst: week.firstWeekDate,
              selectLast: week.lastWeekDate
            })
          }
        >След. неделя</button>
        <Tabs activeKey={ week.selectTabs.toString() } onTabClick={  (tabKey) => switchTabs(tabKey, week.firstWeekDate)  }>
          <TabPane tab="Понедельник" key="1">{week.selectDay}</TabPane>
          <TabPane tab="Вторник" key="2">{week.selectDay}</TabPane>
          <TabPane tab="Среда" key="3">{week.selectDay}</TabPane>
          <TabPane tab="Четверг" key="4">{week.selectDay}</TabPane>
          <TabPane tab="Пятница" key="5">{week.selectDay}</TabPane>
          <TabPane tab="Суббота" key="6">{week.selectDay}</TabPane>
          <TabPane tab="Воскресение" key="7">{week.selectDay}</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Week;
