import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MainPage() {
  const [todoList, setTodo] = useState('')
  const [input, setInput] = useState({  })
  const [update, setUpdate] = useState(false)
  const [editNav, setEditNav] = useState(false)
  const [editInput, setEditInput] = useState({ task: '', name: '', status: '' })
  const [idEdit, setIdEdit] = useState('')

  const getTasks = () => {
    return axios.get('http://localhost:4000/taskList')
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    getTasks()
  }, [update])

  const createTask = async (req) => {
    const res = await axios.post('http://localhost:4000/createTask', req)
    setUpdate(!update)
    return res
  }

  const deleteTask = async (id) => {
    const del = await axios.delete(`http://localhost:4000/deleteTask/${id}`)
    setUpdate(!update)
    return del
  }

  const updateTask = async (id, req) => {
    const edit = await axios.put(`http://localhost:4000/updateTask/${id}`, req)
    setUpdate(!update)
    return edit
  }

  const splitDate = () => {
    const date = todoList && todoList.map((val) => val.date.split('T', [8]))
    return date
  }
  console.log(splitDate())

  return (
    <div>
      <h1>ToDo - EBYTR</h1>
      <input type="text" placeholder="Insert your task" onChange={(e) => setInput({...input, task: e.target.value})} value={input.task} />
      <input type="text" placeholder="Insert your name" onChange={(e) => setInput({...input, name: e.target.value})} value={input.name} />
      <button type="button" onClick={() => {
        createTask(input)
        setInput({ task: '', name: '' })
      }}>+</button>
      <h2>Task list</h2>
      {todoList && todoList.map((value) => <div>
        <p>{`Task: ${value.task}`}</p>
        <p>{`Name: ${value.name}`}</p>
        <p>{`Created At: ${value.date}`}</p>
        <p>{`Current status: ${value.status}`}</p>
        <button type="button" onClick={() => deleteTask(value._id)}>delete</button>
        <button type="button" onClick={() => {
          setIdEdit(value._id)
          setEditNav(!editNav)
        }}>edit</button>
      </div>)}
      <br />
        {editNav ? (
          <div>
            <input type="text" name="task" placeholder="Update task" onChange={(e) => setEditInput({...editInput, task: e.target.value})} value={editInput.task} />
            <input type="text" name="name" placeholder="Update name" onChange={(e) => setEditInput({...editInput, name: e.target.value})} value={editInput.name} />
            <select onChange={(e) => setEditInput({...editInput, status: e.target.value})} >
              <option value="pendent">pendent</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
            <button type="button" onClick={() => {
              updateTask(idEdit, editInput)
              setIdEdit('')
              setEditNav(!editNav)
            }}>update</button>
          </div>
        ) : (null)}
    </div>
  )
}
