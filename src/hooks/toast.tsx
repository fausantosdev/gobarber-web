import { createContext, useContext, ReactNode, useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ToastContainer from '../components/ToastContainer'

interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void
  removeToast(id: string): void
}

interface IProps {
  children: ReactNode
}

export interface IToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

const ToastContext = createContext<IToastContext>({} as IToastContext)

const ToastProvider= ({ children }: IProps) => {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(({ type, title, description }: Omit<IToastMessage, 'id'>) => {
    const id = uuidv4()

    const toast = {
      id, type, title, description
    }

    // Ao passar uma função dentro do set, ele recebe o valor antigo.
    setMessages(oldState => [...oldState, toast])
  }, [messages])

  const removeToast = useCallback((id: string) => {
    setMessages(oldState => oldState.filter(message => message.id !== id))
  }, []) 
  
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

const useToast = (): IToastContext => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used withing an ToastProvider')
  }

  return context
}

export {
  ToastProvider,
  useToast
}
