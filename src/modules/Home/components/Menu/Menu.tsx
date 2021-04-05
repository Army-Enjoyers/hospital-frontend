import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends Omit<BoxProps, 'onChange'> {
  items?: { key: string; value: number }[]
  active?: number
  onChange: (newActive: number) => void
}
export const Menu: React.FC<Props> = ({ items, onChange, active, ...props }) => {
  return (
    <Box
      boxShadow="0 5px 10px 0 rgb(0 0 0 / 10%)"
      mr="100px"
      paddingY="23px"
      width="calc(40% - 100px)"
      {...props}
    >
      {items?.map(({ key, value }) => (
        <Box
          _hover={{ background: '#f5f5f5' }}
          background={active === value ? '#f5f5f5' : 'white'}
          cursor="pointer"
          fontSize="2xl"
          fontWeight="600"
          key={key}
          paddingX="60px"
          paddingY="30px"
          style={{
            transform: active === value ? 'translateX(10%)' : 'none',
          }}
          tranform={active === value ? 'translateX(10px)' : 'none'}
          transition=".5s"
          userSelect="none"
          onClick={() => onChange(value)}
        >
          {key}
        </Box>
      ))}
    </Box>
  )
}
