import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { object, string } from 'yup'

import { Button, Input } from '~/components'
import { useAuth, useForm } from '~/hooks'
import { Container } from '~/layouts'
import { LoginDTO } from '~/modules/Login/types'

const initialValues = {
  login: '',
  password: '',
}

const getSchema = () =>
  object({
    login: string().required('Это поле обязательно для заполнения'),
    password: string().required('Это поле обязательно для заполнения'),
  }).required()

export const Login = () => {
  const { setAuth, isLogin } = useAuth()

  const onSubmit = async (values: LoginDTO) => {
    console.log(values)
    setAuth(true)
  }

  const { field, submitProps } = useForm({
    validationSchema: getSchema(),
    initialValues,
    onSubmit,
  })

  if (isLogin) return <Redirect to="/" />

  return (
    <Container>
      <Flex alignItems="center" height="100vh" justifyContent="center" width="100%">
        <Box boxShadow="0 5px 10px 0 rgb(0 0 0 / 10%)" maxWidth="500px" padding="77px 55px 33px">
          <Text fontSize="3xl" fontWeight="600">
            Добро пожаловать
          </Text>
          <Input mt="50px" placeholder="Логин" {...field('login')} />
          <Input mt="5px" placeholder="Пароль" type="password" {...field('password')} />
          <Button colorScheme="blue" mt="20px" padding={5} width="150px" {...submitProps}>
            Войти
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
