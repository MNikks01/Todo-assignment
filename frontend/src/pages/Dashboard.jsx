import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../components/layout/Header'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import TaskFilters from '../components/tasks/TaskFilters'
import { motion } from 'framer-motion'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Tasks</h1>
                    <div className="space-y-8">
                        <TaskForm />
                        <TaskFilters />
                        <TaskList />
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default Dashboard