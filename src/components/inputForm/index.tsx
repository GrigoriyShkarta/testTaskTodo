import {ChangeEvent, FC, useState} from 'react'
import {useDispatch} from "react-redux"
import { toast } from 'react-toastify'
import {todosSlice} from "../../redux/todoSlice"
import s from "./InputForm.module.scss"


const InputForm:FC = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const {addTodo} = todosSlice.actions

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value || '')
  }

  const addTask = (): number | string | undefined => {
    if (inputValue.trim() === '') {
      return toast.error('The field cannot be empty.')
    }

    const newTask = {
      title: inputValue.trim(),
      completed: false,
      current: false,
      id: Math.floor(Math.random() * 1000000) + 1,
    }

    dispatch(addTodo(newTask))
    toast.success('New task added.')
    setInputValue('')
  }

  return (
    <div className={s.addTask}>
      <input
        className={s.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter task..."
      />
      <button className={s.btn} onClick={addTask}>
                Add
      </button>
    </div>
  )
}

export default InputForm