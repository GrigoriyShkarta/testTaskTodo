import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import todoReducer from './todoSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos'],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ todos: todoReducer }),
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }) as any,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof persistedReducer>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
