import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { updateTask, deleteTask } from '../../features/tasks/tasksSlice'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { deleteTask, updateTask } from '../../store/slices/taskSlice'

const TaskItem = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [taskData, setTaskData] = useState(task)
    const dispatch = useDispatch()

    const handleStatusChange = async () => {
        const updatedTask = {
            ...task,
            status: task.status === 'PENDING' ? 'DONE' : 'PENDING',
        }
        dispatch(updateTask({ id: task._id, taskData: updatedTask }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch(updateTask({ id: task._id, taskData }))
        setIsEditing(false)
    }

    const handleDelete = () => {
        dispatch(deleteTask(task._id))
    }

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-lg shadow overflow-hidden ${task.status === 'DONE' ? 'opacity-80' : ''
                }`}
        >
            {isEditing ? (
                <form onSubmit={handleUpdate} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={taskData.name}
                            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={taskData?.description}
                            onChange={(e) =>
                                setTaskData({ ...taskData, description: e.target.value })
                            }
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3
                                className={`text-lg font-medium ${task?.status === 'DONE' ? 'line-through text-gray-500' : 'text-gray-900'
                                    }`}
                            >
                                {task?.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">{task?.description}</p>
                            <p className="mt-2 text-xs text-gray-500">
                                {format(new Date(task?.createdAt), 'MMM dd, yyyy h:mm a')}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${task?.status === 'DONE'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {task?.status}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={handleStatusChange}
                            className={`px-3 py-1 text-sm rounded-md ${task?.status === 'DONE'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                        >
                            {task?.status === 'DONE' ? 'Mark Pending' : 'Mark Done'}
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </motion.li>
    )
}

export default TaskItem