import React, { ButtonHTMLAttributes } from 'react'

import { Btn } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = (props) => {
  return <Btn type='button' {...props}>{props.children}</Btn>
}

export default Button
