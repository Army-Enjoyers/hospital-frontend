import { Flex, Image, Box } from '@chakra-ui/react'
import React from 'react'

import { images } from './images'

interface Props {
  approved?: boolean
}

export const PasswordRule: React.FC<Props> = ({ children, approved }) => {
  return (
    <Flex
      color={approved ? 'rgba(44, 165, 42, 0.75)' : 'red.50'}
      fontSize="sm"
      fontWeight="500"
      mt="10px"
    >
      <Box mr="4px" mt="5px">
        <Image src={approved ? images.check : images.cross} />
      </Box>
      {children}
    </Flex>
  )
}
