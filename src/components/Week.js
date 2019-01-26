import React, { PureComponent } from 'react';
import DrawerForm from '../containers/DrawerForm'
import Tasks from "../components/Tasks"
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

class Week extends PureComponent {
  componentDidMount(){
    const { resetWeek } = this.props;
    resetWeek();
  }
  render() {
    const {
      week, createTask, editTask, onChangeForm,
      sendCreate, sendEdit, sendDelete,
      nextWeek, prevWeek, resetWeek, switchTabs, tasks, form
    } = this.props;
    return (
      <div>
        <div className="week__controls">
          <div className="controls__weekChange">
            <p>Неделя с { week.firstWeekDate } по { week.lastWeekDate }</p>
            <Button
              onClick={ () =>
                prevWeek({
                  selectFirst: week.firstWeekDate,
                  selectLast: week.lastWeekDate
                })
              }
            >Пред. неделя</Button>
            <Button
              onClick={ () =>
                resetWeek()
              }
            >Сбросить</Button>
            <Button
              onClick={ () =>
                nextWeek({
                  selectFirst: week.firstWeekDate,
                  selectLast: week.lastWeekDate
                })
              }
            >След. неделя</Button>
          </div>
          <div className="controls__newTask">
            <Button onClick={ () => createTask() }>Создать задачу</Button>
          </div>
        </div>
        <Tabs activeKey={ week.selectTabs.toString() } animated={ false } onTabClick={  (tabKey) => switchTabs(tabKey, week.firstWeekDate)  }>
          <TabPane tab="Понедельник" key="1">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Вторник" key="2">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Среда" key="3">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Четверг" key="4">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Пятница" key="5">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Суббота" key="6">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Воскресение" key="7">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
        </Tabs>

        <DrawerForm
          dataSource={form}
          onChangeItem={ (changes) => onChangeForm(changes) }
          sendCreate={(value) => sendCreate(value, week.selectDay)}
          sendEdit={(value) => sendEdit(value, week.selectDay)}
          deleteItem={(id) => sendDelete(id, week.selectDay)}
        />
      </div>
    );
  }
}

export default Week;
