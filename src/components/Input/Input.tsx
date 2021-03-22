import { InputProps, Input as CharkaInput, Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends Omit<InputProps, 'onChange'> {
  onChange(v?: string): void
  error?: string
}

export const Input: React.FC<Props> = ({ onChange, error, ...props }) => {
  return (
    <Box width="100%">
      <CharkaInput
        {...props}
        borderColor={error ? 'red.50' : 'inherit'}
        onChange={(event) => onChange(event.target.value)}
      />
      <Text color="red.50" fontSize="xs" height="20px">
        {error}
      </Text>
    </Box>
  )
}
