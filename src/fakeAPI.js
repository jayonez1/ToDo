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

export const putTask = (body) => {
  const tasks = getAllTasks();
  const newTasks = tasks.map(task => (task.id === body.id) ? body : task);
  const serialTasks = JSON.stringify(newTasks);
  localStorage.setItem("tasks", serialTasks);
}

export const deleteTask = (id) => {
  const tasks = getAllTasks().filter(task => task.id !== id);
  const serialTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", serialTasks);
}
