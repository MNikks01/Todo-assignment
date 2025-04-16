import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
        >
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <h2 className="mt-4 text-2xl font-medium text-gray-800">Page Not Found</h2>
                <p className="mt-2 text-gray-600">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default NotFound