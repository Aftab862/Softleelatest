import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import request from './middlewares/request'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(request)
  },
})

export { store }