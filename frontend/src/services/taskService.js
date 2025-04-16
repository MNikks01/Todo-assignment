import axios from 'axios'

const API_URL = '/api/v1/tasks/'

const getTasks = async (page = 1, filters = {}) => {
    const config = {
        params: {
            page,
            ...filters,
        },
    }
    const response = await axios.get(API_URL + '/get-tasks', config)

    console.log('response', response)
    return response.data
}

const createTask = async (taskData) => {
    const response = await axios.post(API_URL + 'create', taskData)
    return response.data
}

const updateTask = async (id, taskData) => {
    const response = await axios.put(API_URL + 'update/' + id, taskData)
    return response.data
}

const deleteTask = async (id) => {
    await axios.delete(API_URL + 'delete/' + id)
    return id
}

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}

export default taskService