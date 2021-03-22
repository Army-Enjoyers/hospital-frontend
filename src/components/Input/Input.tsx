import { InputProps, Input as CharkaInput } from '@chakra-ui/react'
import React from 'react'

interface Props extends InputProps {}

export const Input: React.FC<Props> = ({ ...props }) => {
  return <CharkaInput {...props} />
}
