import { InputProps } from '@chakra-ui/react'

export interface JSONSchemaFormField {
  type: 'input' | 'textarea' | 'radio'
  name: string
  inputProps: InputProps
  variants?: string[]
}
