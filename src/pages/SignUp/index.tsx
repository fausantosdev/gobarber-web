import { useCallback, useRef } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, Navigate, redirect } from 'react-router-dom'

import { Container, Content, Background, AnimationContainer } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logo from '../../assets/logo.svg'

import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import api from '../../services/apiClient'

type SignUpFormDataProps = {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const { user } = useAuth()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  
  const handleSubmit = useCallback(async (data: SignUpFormDataProps) => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Email precisa estar em um formato válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Sua senha precisa ter no mínimo 6(seis) dígitos').required('Senha é obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await api.post('/users', data)

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu login no GoBarber'
      })

      redirect('/sign-in')
    } catch (error: any) {
      const errors = getValidationErrors(error)

      formRef.current?.setErrors(errors)

      addToast({
        type: 'success',
        title: 'Erro no cadastro!',
        description: 'Ocorreu um erro ao se cadastrar no GoBarber, tente novamente'
      })

      redirect('sign-in')
    }
  }, [addToast])

  return !user ? (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name='name' type='text' placeholder='User'/>
            <Input icon={FiMail} name='email' type='email' placeholder='E-mail'/>
            <Input icon={FiLock} name='password' type='password' placeholder='Senha'/>
            <Button type='submit'>Cadastrar</Button>
            <Link to='/'>Faça login</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  ) : (
    <Navigate to='/'/>
  )
}
/* initialData={{ name: 'Lepo' }} */
export default SignUp
