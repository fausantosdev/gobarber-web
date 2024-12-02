import { ReactNode } from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

interface IProps {
  children: ReactNode
}

const AppProvider = ({ children }: IProps) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  )
}

export default AppProvider
