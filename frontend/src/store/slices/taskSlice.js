import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from '../../services/taskService'

const initialState = {
    tasks: [],
    filteredTasks: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isError: false,
    message: '',
}

export const getTasks = createAsyncThunk(
    'tasks/getAll',
    async ({ page = 1, filters = {} }, thunkAPI) => {
        try {
            return await taskService.getTasks(page, filters)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData, thunkAPI) => {
        try {
            return await taskService.createTask(taskData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ id, taskData }, thunkAPI) => {
        try {
            return await taskService.updateTask(id, taskData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (id, thunkAPI) => {
        try {
            await taskService.deleteTask(id)
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        },
        searchTasks: (state, action) => {
            const searchTerm = action.payload.toLowerCase()
            if (searchTerm === '') {
                state.filteredTasks = state.tasks
            } else {
                state.filteredTasks = state.tasks.filter(task =>
                    task.name.toLowerCase().includes(searchTerm)
                )
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = action.payload.tasks
                state.filteredTasks = action.payload.tasks
                state.currentPage = action.payload.currentPage
                state.totalPages = action.payload.totalPages
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks.unshift(action.payload)
                state.filteredTasks.unshift(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                )
                state.filteredTasks = state.filteredTasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                )
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = state.tasks.filter(task => task._id !== action.payload)
                state.filteredTasks = state.filteredTasks.filter(task => task._id !== action.payload)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset, searchTasks } = tasksSlice.actions
export default tasksSlice.reducer