import uuid from 'uuid/v4'

export const getAllTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

export const postTask = (body) => {
  const tasks = getAllTasks();
  const newTask = {
    id: uuid(),
    ...body
  }
  tasks.push(newTask);
  const serialTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", serialTasks);
}
