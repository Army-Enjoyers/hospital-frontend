import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps {}

export const Button: React.FC<Props> = ({ ...props }) => {
  return <ChakraButton {...props} />
}
