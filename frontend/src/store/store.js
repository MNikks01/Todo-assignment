
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import tasksSlice from './slices/taskSlice'
// import authReducer from '../features/auth/authSlice'
// import tasksReducer from '../features/tasks/tasksSlice'
// import { authSlice } from './slices/authSlice'
// import { tasksSlice } from './slices/taskSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        tasks: tasksSlice,
    },
})