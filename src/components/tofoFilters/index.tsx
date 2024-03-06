import {FC} from 'react'
import s from "./TodoFilters.module.scss"

interface ITodoFilter {
  filter: string
  setFilter: (filter: string) => void
}

const TodoFilter: FC<ITodoFilter> = ({ filter, setFilter }) =>
  <div className={s.wrapper}>
    <label>
      <input
        type="radio"
        value="all"
        checked={filter === 'all'}
        onChange={(): void => setFilter('all')}
      />
            All
    </label>
    <label>
      <input
        type="radio"
        value="completed"
        checked={filter === 'completed'}
        onChange={(): void => setFilter('completed')}
      />
            Completed
    </label>
    <label>
      <input
        type="radio"
        value="current"
        checked={filter === 'current'}
        onChange={(): void => setFilter('current')}
      />
            Current
    </label>
  </div>


export default TodoFilter