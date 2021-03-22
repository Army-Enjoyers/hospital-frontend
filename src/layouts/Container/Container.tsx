import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const containerOptions = {
  mx: 'auto',
  maxWidth: ['calc(100% - 40px)', 'calc(100% - 40px)', '768px', '1252px'],
}

export const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box {...containerOptions} {...props}>
      {children}
    </Box>
  )
}
