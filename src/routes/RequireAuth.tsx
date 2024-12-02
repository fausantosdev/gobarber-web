import React from 'react'
import { useAuth } from '../hooks/auth'
import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element | any
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const { user } = useAuth()

  return !user ? <Navigate to='/sign-in'/> : children
}

export default RequireAuth

// {!user ? <Navigate to='/' replace/> : children}
