import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (credentials) => {
    const response = await axios.post('/api/users/login', credentials, {
      withCredentials: true,
    })
    setUser(response.data.user)
  }

  const logout = async () => {
    await axios.post('/api/users/logout', {}, { withCredentials: true })
    setUser(null)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/users/me', { withCredentials: true })
        setUser(res.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
