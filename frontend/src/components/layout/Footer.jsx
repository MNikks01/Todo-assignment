import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-t border-gray-200 py-6"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} To-Do List. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                            Privacy
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer