const {
  createToDo,
  getToDo,
  getTaskById,
  updateToDoByID,
  deleteToDoByID,
} = require('../models/toDoModel');

const createTask = async (req, res) => {
  const { task, name } = req.body;
  const crtToDo = await createToDo(task, name);
  if (!crtToDo) return res.status(400).json({ message: 'Error' })
  return res.status(201).json({ message: 'Task created' })
}

const getTasks = async (req, res) => {
  const gtTaskList = await getToDo()
  if (!gtTaskList) return res.status(400).json({ message: 'Error' })
  return res.status(201).json(gtTaskList)
}

const getTasksById = async (req, res) => {
  const { id } = req.params;
  const getID = await getTaskById(id);
  if (!getID) {
   return res.status(404).json({ message: 'Error' });
  }
  return res.status(200).json(getID);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, task, date, status } = req.body;
  const upt = await updateToDoByID(id, name, task, date, status);
  if (!upt) return res.status(400).json({ message: 'Error' })
  return res.status(200).json({ message: 'Task updated' });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const dlt = await deleteToDoByID(id);
  if (!dlt) return res.status(400).json({ message: 'Error' })
  return res.status(200).json({ message: 'Task deleted' })
};

module.exports = {
  createTask,
  getTasks,
  getTasksById,
  updateTask,
  deleteTask,
};