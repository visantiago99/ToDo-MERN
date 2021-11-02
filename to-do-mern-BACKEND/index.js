const express = require('express');

const {
  createTask,
  getTasks,
  getTasksById,
  updateTask,
  deleteTask,
} = require('./controller/toDoController');

const app = express();

app.use(express.json());

app.post('/createTask', createTask);

app.get('/taskList', getTasks);

app.get('/findTask/:id', getTasksById);

app.put('/updateTask/:id', updateTask);

app.delete('/deleteTask/:id', deleteTask)

const PORT = 4000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
