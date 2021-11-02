const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createToDo = (task, name, date = new Date(), status = 'pendente') => connection()
  .then((db) => db.collection('tasks').insertOne({
    task,
    name,
    date,
    status
  }));

const getToDo = () => connection()
  .then((db) => db.collection('tasks').find().toArray())

  const getTaskById = (id) => connection()
  .then((db) => db.collection('tasks').findOne({ _id: ObjectId(id) }))
  .catch(() => null);

const updateToDoByID = (id, task, name, date, status) => {
      if (!ObjectId.isValid(id)) return false; 
  return connection()
      .then((db) => db.collection('tasks')
          .updateOne({ _id: ObjectId(id) }, { $set: { task, name, date, status } }));
  };

const deleteToDoByID = (id) => {
    if (!ObjectId.isValid(id)) return false; 
    return connection()
        .then((db) => db.collection('tasks').deleteOne({ _id: ObjectId(id) }));
  };

  module.exports = {
    createToDo,
    getToDo,
    getTaskById,
    updateToDoByID,
    deleteToDoByID,
  };