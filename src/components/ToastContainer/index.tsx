import { useTransition, animated } from '@react-spring/web'

import { Container } from './styles'

import { IToastMessage } from '../../hooks/toast'

import Toast from './Toast'

type ToasContainerProps =  {
  messages: IToastMessage[]
}

const ToastContainer = ({ messages }: ToasContainerProps) => {
  const messagesWithTransitions = useTransition(messages, () => ({
    from: {
      right: '-120%'
    },
    enter: {
      right: '0%'
    },
    leave: {
      right: '-120px'
    }
  }))

  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}

export default ToastContainer
