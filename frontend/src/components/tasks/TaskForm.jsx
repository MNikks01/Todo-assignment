import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { createTask } from '../../features/tasks/tasksSlice'
import { motion } from 'framer-motion'
import { createTask } from '../../store/slices/taskSlice'

const TaskForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

    const { user: { user: { _id: userId } } } = useSelector((state) => state.auth)


    const onSubmit = (e) => {
        e.preventDefault()
        if (!name.trim()) return
        dispatch(
            createTask({
                name,
                description,
                status: 'PENDING',
                id: userId
            })
        )
        setName('')
        setDescription('')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow"
        >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="task-name" className="block text-sm font-medium text-gray-700">
                        Task Name
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="Enter task name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">
                        Description (Optional)
                    </label>
                    <textarea
                        id="task-description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="Enter task description"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default TaskForm