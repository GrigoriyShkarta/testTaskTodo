import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface ITodo {
  id: number
  title: string
  completed: boolean
  current: boolean
}

interface TodosState {
  todos: ITodo[]
}

const initialState: TodosState = {
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo (state: TodosState, action: PayloadAction<ITodo>): void {
      state.todos.push(action.payload)
    },
    deleteTodo: (state: TodosState, action: PayloadAction<number>): void => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    toggleTodoStatus: (state: TodosState, action: PayloadAction<number>): void => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        if (todo.completed) todo.current = false
      }
    },
    setCurrentTodo: (state: TodosState, action: PayloadAction<number>): void => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) {
        todo.current = !todo.current
      }
    },
    editTodo: (state: TodosState, action: PayloadAction<{ id: number, title: string }>): void => {
      const todo = state.todos.find((t) => t.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
      }
    },
  },
})
export default todosSlice.reducer