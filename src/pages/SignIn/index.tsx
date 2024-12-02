import { useRef, useCallback, useEffect } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, Navigate } from 'react-router-dom'

import { Container, Content, Background, AnimationContainer } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logo from '../../assets/logo.svg'

import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

type SignInFormDataProps = {
  email: string
  password: string
}

const SignIn = () => {
  const { signIn, user } = useAuth()
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: SignInFormDataProps) => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Email precisa estar em um formato válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Sua senha precisa ter no mínimo seis caracteres')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const response = await signIn({
        email: data.email,
        password: data.password
      })

      console.log(response)

      if (response.status === 'error') {
        addToast({
          type: 'error',
          title: 'Erro de autenticação',
          description: response.message
          // description: 'Ocorreu um erro ao fazer login, cheque suas credenciais'
        })

        // return
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)
      } else {
        addToast({
          type: 'error',
          title: 'Oops!',  
          description: error.message
          // description: 'Ocorreu um erro ao fazer login, cheque suas credenciais'
        })
      }
    }
  }, [signIn, addToast])// < É preciso acrescentar aqui todas as variáveis externas usadas no useCallback

  return !user ? (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
          <Form ref={formRef} onSubmit={handleSubmit} initialData={{ name: 'Lepo' }}>
            <h1>Entrar</h1>
            <Input icon={FiMail} name='email' type='email' placeholder='E-mail'/>
            <Input icon={FiLock} name='password' type='password' placeholder='Senha'/>
            <Button type='submit'>Cadastrar</Button>
            <Link to='/sign-up'>Faça seu cadastro</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  ) : (
    <Navigate to='/'/>
  )
}

export default SignIn
