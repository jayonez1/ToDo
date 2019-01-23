import React, { PureComponent } from 'react';
import { Table, Empty, Button, Icon } from 'antd';

const columns = [
  { title: 'Название задачи', dataIndex: 'title', key: 'title' },
  { title: 'Описание', dataIndex: 'description', key: 'description' },
  { title: 'Начало', dataIndex: 'start', key: 'start' },
  { title: 'Окончание', dataIndex: 'over', key: 'over' },
  { title: 'Важность', dataIndex: 'rate', key: 'rate' },
  {
    title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>,
  },
];


class Tasks extends PureComponent {
  createDataTable = () => {
    const { tasks, selectDay } = this.props;
    console.log(tasks[selectDay]);
    if ( tasks[selectDay] ) {
      return tasks[selectDay].map(task => (
        {
          key: task.id,
          title: task.title,
          description: task.description,
          start: task.start,
          over: task.over,
          rate: task.rate
        }
      ))
    }
    return null
  }
  render() {
    const dataTable = this.createDataTable()
    return (
      <div>
        {
          (dataTable)
          ?
            <Table
              columns={columns}
              expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={dataTable}
            />
          :
            <Empty>
              <Button>Создать Task</Button>
            </Empty>

        }
      </div>

    );
  }
}

export default Tasks;
