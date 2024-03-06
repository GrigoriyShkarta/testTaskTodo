import {FC, useState} from 'react'
import {useAppDispatch} from "../../redux/hook"
import {todosSlice} from "../../redux/todoSlice"
import {toast} from "react-toastify"
import classnames from 'classnames'
import s from "./TodoItem.module.scss"

const TodoItem:FC<any> = ({ todo }) => {
  const [editable, setEditable] = useState(false)
  const [editedTitle, setEditedTitle] = useState<string>(todo.title)
  const dispatch = useAppDispatch()
  const { deleteTodo, toggleTodoStatus, setCurrentTodo, editTodo } = todosSlice.actions
  const deleteTask = (id: number): void => {
    dispatch(deleteTodo(id))
    toast.info('The task was deleted.')
  }

  const toggleTaskStatus = (id: number): void => {
    dispatch(toggleTodoStatus(id))
    const updatedTask = { id, completed: !todo.completed }
    toast('Task status changed.')
  }

  const toggleCurrentTask = (id: number): void => {
    dispatch(setCurrentTodo(id))
    toast('Task current changed.')
  }

  const handleSave = (id: number): string | number| undefined => {
    if (editedTitle.trim() === '') {
      return toast.error('The field cannot be empty.')
    }

    if (editedTitle.trim() === todo.title) {
      return toast.error('The task name is not changed.')
    }

    dispatch(editTodo({id, title: editedTitle}))
    setEditable(false)
    toast.info('Task name has been changed.')
  }

  const handleCancel = (): void => {
    setEditedTitle(todo.title)
    setEditable(false)
  }

  const handleInputChange = (event: any): void => {
    setEditedTitle(event.target.value)
  }

  const taskClassNames = classnames('none', {
    [s.task_checked]: todo.completed,
    [s.task_current]: todo.current,
    'none': !todo.completed && !todo.current,
  })

  if (!todo) {
    return null
  }

  return (

    <li className={s.task}>
      {editable ? 
        <input
          className={s.input_edit}
          type="text"
          value={editedTitle as string}
          onChange={handleInputChange}
          autoFocus
        />
        : 
        <span className={taskClassNames}>{todo.title}</span>
      }
      <div className={s.btnWrapper}>
        {editable ? 
          <>
            <button className={s.btnWrapper__save} onClick={(): string | number | undefined => handleSave(todo.id)}>
              Save
            </button>
            <button className={s.btnWrapper__cancel} onClick={handleCancel}>
              Cancel
            </button>
          </>
          : 
          <>
            <button className={s.btnWrapper_edit} onClick={(): void => setEditable(true)}>
              Edit
            </button>
            {!todo.completed &&
              <button className={s.btnWrapper_current} onClick={(): void => toggleCurrentTask(todo.id)}>
                {todo.current ? 'Deselect' : 'Current'}
              </button>
            }
            <button
              className={s.btnWrapper__done}
              onClick={(): void => toggleTaskStatus(todo.id)}
            >
              {todo.completed ? 'Active' : 'Done'}
            </button>
            <button
              className={s.btnWrapper_delete}
              onClick={(): void => deleteTask(todo.id)}
            >
                                Delete
            </button>
          </>
        }
      </div>
    </li>
  )
}

export default TodoItem