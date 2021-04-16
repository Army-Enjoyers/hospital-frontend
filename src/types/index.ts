import { InputProps } from '@chakra-ui/react'

export interface JSONSchemaFormField {
  type: 'input' | 'textarea' | 'radio'
  name: string
  id: string
  inputProps: InputProps
  variants?: string[]
}
