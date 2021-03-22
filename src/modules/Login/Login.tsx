import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { Button, Input } from '~/components'
import { Container } from '~/layouts'

export const Login = () => {
  return (
    <Container>
      <Flex alignItems="center" height="100vh" justifyContent="center" width="100%">
        <Box boxShadow="0 5px 10px 0 rgb(0 0 0 / 10%)" maxWidth="500px" padding="77px 55px 33px">
          <Text fontSize="3xl" fontWeight="600">
            Добро пожаловать
          </Text>
          <Input mt="50px" placeholder="Логин" />
          <Input mt="20px" placeholder="Пароль" />
          <Button colorScheme="blue" mt="50px" padding={5} width="150px">
            Войти
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
