import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskItem from './TaskItem'
import Pagination from './Pagination'
import { motion } from 'framer-motion'
import { getTasks } from '../../store/slices/taskSlice'

const TaskList = () => {
    const dispatch = useDispatch()
    const { tasks, filteredTasks, isLoading, currentPage, totalPages } = useSelector((state) => state.tasks)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(getTasks({ page: currentPage, filters: { user: user?.user?._id, } }))
        }
    }, [dispatch, user, currentPage])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    console.log('tasks ->', tasks)
    console.log('filteredTasks ->', filteredTasks)

    return (
        <div className="space-y-4">
            {filteredTasks?.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500"
                >
                    No tasks found. Add a new task to get started!
                </motion.div>
            ) : (
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    {filteredTasks?.map((task) => (
                        <TaskItem key={task?._id} task={task} />
                    ))}
                </motion.ul>
            )}
            {totalPages > 1 && <Pagination />}
        </div>
    )
}

export default TaskList