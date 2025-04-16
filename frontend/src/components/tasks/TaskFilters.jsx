import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { searchTasks, getTasks } from '../../features/tasks/tasksSlice'
import { format } from 'date-fns'
import { getTasks, searchTasks } from '../../store/slices/taskSlice'

const TaskFilters = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [dateFilter, setDateFilter] = useState('')
    const dispatch = useDispatch()
    const { currentPage } = useSelector((state) => state.tasks)

    useEffect(() => {
        const filters = {}
        if (statusFilter !== 'ALL') filters.status = statusFilter
        if (dateFilter) filters.date = dateFilter

        dispatch(getTasks({ page: currentPage, filters }))
    }, [statusFilter, dateFilter, currentPage, dispatch])

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)
        dispatch(searchTasks(term))
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setStatusFilter('ALL')
        setDateFilter('')
        dispatch(searchTasks(''))
        dispatch(getTasks({ page: 1 }))
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                        Search by name
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="Search tasks..."
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Filter by status
                    </label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Filter by date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                </div>
            </div>
            {(searchTerm || statusFilter !== 'ALL' || dateFilter) && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleClearFilters}
                        className="text-sm text-primary hover:text-primary-dark"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default TaskFilters