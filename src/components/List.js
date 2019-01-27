import React, { PureComponent } from 'react';
import DrawerForm from '../containers/DrawerForm'
import Tasks from "../components/Tasks"
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

class Month extends PureComponent {
  componentDidMount(){
    const { resetList } = this.props;
    resetList();
  }
  render() {
    const {
      list, createTask,
      switchTabs, tasks, form, onChangeForm,
      sendCreate, sendDelete, sendEdit, editTask
    } = this.props;
    return (
      <div>
        <div className="table__controls">
          <div/>
          <div className="controls__newTask">
            <Button onClick={ () => createTask() }>Создать задачу</Button>
          </div>
        </div>
        <Tabs
          activeKey={ list.selectTabs.toString() }
          animated={ false }
          onTabClick={ (tabKey) => switchTabs(tabKey) }
          tabPosition="top"
        >
          <TabPane tab="Сегодня" key="today">
              <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Завтра" key="tomorrow">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Неделя" key="week">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Месяц" key="month">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
          <TabPane tab="Год" key="year">
            <Tasks tasks={tasks} editTask={(props) => editTask(props)}/>
          </TabPane>
        </Tabs>

        <DrawerForm
          dataSource={form}
          onChangeItem={ (changes) => onChangeForm(changes) }
          sendCreate={(value) => sendCreate(value, list.selectTabs)}
          sendEdit={(value) => sendEdit(value, list.selectTabs)}
          deleteItem={(id) => sendDelete(id, list.selectTabs)}
        />

      </div>
    );
  }
}




export default Month;
