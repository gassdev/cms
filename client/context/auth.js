import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: '' })

  // config axios
  if (process.server) {
    axios.defaults.baseURL = process.env.API
  } else {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API
  }

  useEffect(() => {
    if (localStorage.getItem('cms-auth')) {
      setAuth(JSON.parse(window.localStorage.getItem('cms-auth')))
    }
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
