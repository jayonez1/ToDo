import React, { PureComponent } from 'react';
import moment from "moment";
import { Table, Empty, Icon, List } from 'antd';

const columns = [
  { title: 'Название задачи', dataIndex: 'title', key: 'title' },
  {
    title: 'Начало',
    dataIndex: 'start',
    key: 'start',
    align:"center",
    sorter: (a, b) => moment(a.start, "DD-MM-YYYY HH:mm").format('X')-moment(b.start, "DD-MM-YYYY HH:mm").format('X')
  },
  {
    title: 'Окончание',
    dataIndex: 'over',
    key: 'over',
    align:"center",
    sorter: (a, b) => moment(a.over, "DD-MM-YYYY HH:mm").format('X')-moment(b.over, "DD-MM-YYYY HH:mm").format('X')
  },
  { title: 'Важность', dataIndex: 'rate', key: 'rate', align:"center" },
  {
    title: 'Кол-во участников',
    dataIndex: 'numberParticipants',
    key: 'numberParticipants',
    align:"center",
    sorter: (a, b) => a.numberParticipants - b.numberParticipants
  },
  { title: '', dataIndex: 'editTast', key: 'editTast', align:"center"  },
];

class Tasks extends PureComponent {
  createDataTable = () => {
    const { tasks, editTask } = this.props;
    const getRate = (rate) => <div>{rate} <Icon type="star" /></div>;
    return tasks.map(
      task => (
        {
          key: task.id,
          title: task.title,
          start: task.dateTimeStart || null,
          over: task.dateTimeOver || null,
          rate: getRate(task.rate || 0),
          numberParticipants: (task.participants) ? task.participants.length : 0,
          description: task.description || "",
          participants: task.participants || [],
          editTast: <span style={{cursor:"pointer"}} onClick={ () => editTask({id: task.id, editProps: tasks}) } >Ред / Удл</span>
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
                     <h4> Описание задачи:</h4> <p style={{maxWidth: "750px", wordWrap: "break-word", textAlign: "justify"}}>{record.description}</p>
                     <h4 style={{ margin: '16px 0' }}>
                       Участники: {(record.participants && record.participants.length > 0) ? null : "Нет"}
                     </h4>
                     {
                       (record.participants && record.participants.length > 0)
                        ? <List
                            size="small"
                            bordered
                            dataSource={record.participants}
                            className="taskTable__participantsList"
                            renderItem={item => (<List.Item>{item.name}</List.Item>)}
                          />
                        : null
                     }

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
