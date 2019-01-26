import uuid from 'uuid/v4'

export const getAllTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

export const postTask = () => {
  const tasks = getAllTasks();
  const body = {
    id: uuid(),
    title: "Тестовая таска",
    dateStart:"26-01-2019"
  }
  tasks.push(body);
  const serialTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", serialTasks);
}
