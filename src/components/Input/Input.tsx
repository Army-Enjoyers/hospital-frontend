import { InputProps, Input as CharkaInput } from '@chakra-ui/react'
import React from 'react'

interface Props extends Omit<InputProps, 'onChange'> {
  onChange(v?: string): void
}

export const Input: React.FC<Props> = ({ onChange, ...props }) => {
  return <CharkaInput {...props} onChange={(event) => onChange(event.target.value)} />
}
