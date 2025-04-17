import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store/slices/authSlice'

const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (!user && storedUser) {
            dispatch(setUser(storedUser))
        } else if (!user && !storedUser) {
            navigate('/login')
        }
    }, [user, navigate, dispatch])

    return user
}

export default useAuth