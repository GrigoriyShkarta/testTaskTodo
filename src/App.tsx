import React from 'react'
import './App.css'
import Title from "./components/title"
import InputForm from "./components/inputForm"
import TodoList from "./components/todoList"
import Notifications from "./utils/Notifications"

function App() {
  return (
    <div className="todo-app">
      <Title/>
      <InputForm/>
      <TodoList/>
      <Notifications/>
    </div>
  )
}

export default App
