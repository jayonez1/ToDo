import React, { PureComponent } from 'react';
import DrawerForm from '../containers/DrawerForm'
import Tasks from "../components/Tasks"
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

class Month extends PureComponent {
  componentDidMount(){
    const { resetMonth } = this.props;
    resetMonth();
  }
  crateTabs = () => this.props.month.daysMonth.map((day, i) => (
    <TabPane tab={day} key={`${i+1}`}>
      <Tasks tasks={this.props.tasks} editTask={(props) => this.props.editTask(props)}/>
    </TabPane>
  ))
  render() {
    const {
      month, prevMonth, resetMonth, nextMonth, createTask,
      switchTabs, onChangeForm, sendCreate, sendEdit, sendDelete, form
    } = this.props;
    return (
      <div>
        <div className="week__controls">
          <div className="controls__weekChange">
            <p>Месяц с { month.firstMonthDate } по { month.lastMonthDate }</p>
            <Button
              onClick={ () =>
                prevMonth(month.firstMonthDate)
              }
            >Пред. месяц</Button>
            <Button
              onClick={ () =>
                resetMonth()
              }
            >Сбросить</Button>
            <Button
              onClick={ () =>
                nextMonth(month.firstMonthDate)
              }
            >След. месяц</Button>
          </div>
          <div className="controls__newTask">
            <Button onClick={ () => createTask() }>Создать задачу</Button>
          </div>
        </div>
        <Tabs activeKey={ month.selectTabs.toString() } animated={ false } onTabClick={  (tabKey) => switchTabs(tabKey, month.firstMonthDate)  }>
          {this.crateTabs()}
        </Tabs>

        <DrawerForm
          dataSource={form}
          onChangeItem={ (changes) => onChangeForm(changes) }
          sendCreate={(value) => sendCreate(value, month.selectDay)}
          sendEdit={(value) => sendEdit(value, month.selectDay)}
          deleteItem={(id) => sendDelete(id, month.selectDay)}
        />

      </div>
    );
  }
}



export default Month;
