import React, { PureComponent } from 'react';
import { Table, Empty, Button, Icon, List } from 'antd';

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
    const { tasks } = this.props;
    const getRate = (rate) => <div>{rate} <Icon type="star" /></div>;
    return tasks.map(
      task => (
        {
          key: task.id,
          title: task.title,
          rate: getRate((task.rate) ? task.rate : 0),
          numberParticipants: (task.participants) ? task.participants.length : 0,
          description: (task.description) ? task.description : "",
          participants: (task.participants) ? task.participants : [],
          editTast: <span style={{cursor:"pointer"}} >Редактировать</span>
        }
      )
    )
  }
  render() {
    const dataTable = this.createDataTable()
    return (
      <div>
        <div className="taskTable">
         {
           (dataTable.length > 0)
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
             <Empty />
         }
         </div>
       </div>
    );
  }
}

export default Tasks;
