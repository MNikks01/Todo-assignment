import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../../features/auth/authSlice'
import { motion } from 'framer-motion'
import { logout } from '../../store/slices/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state?.auth)

    const onLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow-sm"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">To Do List</span>
                    </Link>

                    <nav className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-gray-700">
                                    Welcome, {user?.user?.name}
                                </span>
                                <button
                                    onClick={onLogout}
                                    className="text-sm font-medium text-primary hover:text-primary-dark"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-primary"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm font-medium text-primary hover:text-primary-dark"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </motion.header>
    )
}

export default Header