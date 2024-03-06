import {FC, useEffect, useState} from 'react'
import {useAppSelector} from "../../redux/hook"
import {ITodo} from "../../redux/todoSlice"
import TodoItem from "../todoItem"
import TodoFilter from "../tofoFilters"
import Pagination from "../../utils/Pagination"
import s from "./TodoList.module.scss"

const PAGE_SIZE = 5

const TodoList:FC = () => {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [items, setItems] = useState<ITodo[]>([])
  const todos = useAppSelector(state => state.todos.todos)

  useEffect(() => {
    setItems(todos)
  }, [currentPage, todos])

  const handlePageChange = ({selected}: any): void => {
    setCurrentPage(selected)
  }

  const filteredTodos = items.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'completed') return todo.completed
    if (filter === 'current') return todo.current
    return true
  }).reverse()

  return (
    <>
      <TodoFilter filter={filter} setFilter={setFilter}/>
      <ul className={s.tasks}>
        {filteredTodos.map((todo, index) => 
          <TodoItem
            key={index}
            todo={todo}
          />
        ).slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE,)}
      </ul>
      {filteredTodos.length > PAGE_SIZE && 
        <Pagination
          pageCount={Math.ceil(todos.length / PAGE_SIZE)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          todosLength={todos.length}
          PAGE_SIZE={PAGE_SIZE}
        />
      }
    </>
  )
}

export default TodoList