import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    getCurrentUser().then((user) => {
      setIsAuthenticated(Boolean(user))
      setIsChecking(false)
    })
  }, [])

  if (isChecking) {
    return <main className="container auth-wrap">Checking your session...</main>
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute