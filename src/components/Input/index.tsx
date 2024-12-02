import { InputHTMLAttributes, ComponentType, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './styles'
/**
 * InputHTMLAttributes = todas as propriedades que já existem em um input
 * usamos interface pois vamos cobrescrever/criar novas propriedades.
 *
 * HTMLInputElement = global
 */
type InputProps =  InputHTMLAttributes<HTMLInputElement> & {
  name: string
  icon?: ComponentType<IconBaseProps>// Para receber um componente como props
}

const Input= (props: InputProps) => {
  const { icon: Icon, name } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isFiled, setIsFiled] = useState(false)

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    if (inputRef.current?.value) {
      setIsFiled(true)
    } else {
      setIsFiled(false)
    }
    // Ou setIsFiled(!!inputRef.current?.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
      <Container isErrored={!!error} isFocused={isFocused} isFiled={isFiled}>
        {Icon && <Icon size={20} />}
        <input
          {...props}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}/>

          {error && (
            <Error title={error}>
              <FiAlertCircle color='#c53030' size={20}/>
            </Error>
          )}
      </Container>
  )
}

export default Input
