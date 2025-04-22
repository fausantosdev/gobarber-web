import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import api from '../services/apiClient'

interface IAuthState {
  token: string
  user: object
}

interface ISignInCredentials {
  email: string
  password: string
}

type response = {
  status: string
  message: string
}

interface IAuthContext {
  user: object
  signIn(credentials: ISignInCredentials): Promise<response>
  signOut(): void
}

// Erro: Property 'children' does not exist on type '{}'.ts(2339)
// Correção: https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
interface IProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider = ({ children }: IProps) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user && (token !== 'undefined') && (user !== 'undefined')) {
      return {
        token,
        user: JSON.parse(user)
      }
    }

    return {} as IAuthState
  }) 

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const response = await api.post('session/sign-in', {
      email, password
    })
    
    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })

    return response.data
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as IAuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)

  if (!context) { // Se o contexto ainda não foi criado, ou seja, se for chamado ser dentro de um provider
    throw new Error('useAuth must be used withing an AuthProvider')
  }

  return context
}

export {
  AuthProvider,
  useAuth
}
