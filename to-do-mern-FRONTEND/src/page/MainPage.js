import { useState } from 'react';

export default function MainPage() {
  const [todoList, setTodo] = useState([])
  const [input, setInput] = useState('')

  const addToArray = () => {
    setTodo([...todoList, input])
    return setInput('')
  }

  return (
    <div>
      <h1>ToDo - MERN</h1>
      <input type="text" placeholder="Add task" onChange={(e) => setInput(e.target.value)} value={input}  />
      <button type="button" onClick={addToArray}>+</button>
      <br />
      <h2>Task list</h2>
      {todoList && todoList.map((i) => <ul key={i}>
        <li>{i}</li>
      </ul>)}
    </div>
  )
}
