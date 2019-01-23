import React, { PureComponent } from 'react';
import Tasks from "../containers/Tasks"
import { Tabs } from 'antd';


const TabPane = Tabs.TabPane;

class Week extends PureComponent {
  render() {
    const {week, nextWeek, prevWeek, resetWeek, switchTabs} = this.props;
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
        <Tabs activeKey={ week.selectTabs.toString() } animated={ true } onTabClick={  (tabKey) => switchTabs(tabKey, week.firstWeekDate)  }>
          <TabPane tab="Понедельник" key="1"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Вторник" key="2"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Среда" key="3"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Четверг" key="4"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Пятница" key="5"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Суббота" key="6"> <Tasks selectDay={ week.selectDay }/> </TabPane>
          <TabPane tab="Воскресение" key="7"> <Tasks selectDay={ week.selectDay }/> </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Week;
