import React, { PureComponent } from 'react';
import { Table, Empty, Button, Icon, List } from 'antd';
import DrawerForm from '../containers/DrawerForm'

const columns = [
  { title: 'Название задачи', dataIndex: 'title', key: 'title' },
  { title: 'Начало', dataIndex: 'start', key: 'start', align:"center" },
  { title: 'Окончание', dataIndex: 'over', key: 'over', align:"center" },
  { title: 'Важность', dataIndex: 'rate', key: 'rate', align:"center" },
  { title: 'Кол-во участников', dataIndex: 'numberParticipants', key: 'numberParticipants', align:"center" },
  { title: '', dataIndex: 'editTast', key: 'editTast', align:"center"  },
];


class Tasks extends PureComponent {
  createDataTable = () => {
    const { tasks, selectDay, editTask } = this.props;
    const getRate = (rate) => <div>{rate} <Icon type="star" /></div>
    if ( tasks[selectDay] ) {
      return tasks[selectDay].map(task => (
        {
          key: task.id,
          title: task.title,
          start: task.start,
          over: task.over,
          rate: getRate(task.rate),
          numberParticipants: (task.participants) ? task.participants.length : 0,
          description: task.description,
          participants: (task.participants) ? task.participants : [],
          editTast: <span style={{cursor:"pointer"}} onClick={ () => editTask(task.id) }>Редактировать</span>
        }
      ))
    }
    return null
  }
  render() {
    const dataTable = this.createDataTable()
    const { newTask } = this.props
    return (
      <div>
        <DrawerForm />
        <div className="taskTable">
          {
            (dataTable)
            ?
              <Table
                columns={columns}
                dataSource={dataTable}
                expandedRowRender={
                  record =>
                    <div style={{ margin: 0 }}>
                      <p>Описание задачи: {record.description}</p>
                      <h4 style={{ margin: '16px 0' }}>Участники: </h4>
                      <List
                        size="small"
                        bordered
                        dataSource={record.participants}
                        className="taskTable__participantsList"
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                      />
                    </div>
                }
              />
            :
              <Empty>
                <Button onClick={ () => newTask() }>Создать задачу</Button>
              </Empty>
          }
        </div>
      </div>

    );
  }
}

export default Tasks;
