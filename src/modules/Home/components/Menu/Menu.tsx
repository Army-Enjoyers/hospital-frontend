import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends Omit<BoxProps, 'onChange'> {
  items?: { key: string; value: number }[]
  active: number
  onChange: (newActive: number) => void
}
export const Menu: React.FC<Props> = ({ items, onChange, ...props }) => {
  return (
    <Box boxShadow="0 5px 10px 0 rgb(0 0 0 / 10%)" padding="30px" width="max-content" {...props}>
      {items?.map(({ key, value }) => (
        <Box
          fontWeight="600"
          key={key}
          padding="10px"
          onClick={() => onChange(value)}
        >
          {key}
        </Box>
      ))}
    </Box>
  )
}
