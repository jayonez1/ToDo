const initialTasks = {
  "21-01-2019":[
    {id: 1, title: "Бла Бла 1", description: "Описание Бла Бла 1", start: "123", over: "321", rate:5},
    {id: 5, title: "Бла Бла 12", description: "Описание Бла Бла 12", start: "123", over: "321", rate:2},
    {id: 4, title: "Бла Бла 13", description: "Описание Бла Бла 13", start: "123", over: "321", rate:3}
  ],
  "23-01-2019":[
    {id: 2, title: "Бла Бла 2", description: "Описание Бла Бла 2", start: "123", over: "321", rate:1}
  ],
  "25-01-2019":[
    {id: 3, title: "Бла Бла 3", description: "Описание Бла Бла 3", start: "123", over: "321", rate:2}
  ]
}


export function tasks(state = initialTasks, action) {
  switch (action.type) {
    default:
      return state
  }
}
