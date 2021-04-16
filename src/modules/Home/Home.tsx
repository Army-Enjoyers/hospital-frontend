import { Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createClient } from '~/api'
import { useAuth } from '~/hooks'
import { Container } from '~/layouts'
import { ISchemeMeta } from '~/types'

import { Calculator, DoctorDiary, Greetings, History, Menu, References } from './components'
import { NAVIGATION } from './types'

export const Home = () => {
  const [route, setRoute] = useState<NAVIGATION | undefined>()
  const [available, setAvailable] = useState<ISchemeMeta[] | null>(null)

  const { isLogin, setAuth } = useAuth()

  useEffect(() => {
    const client = createClient()
    void client.getAvailableSchemes().then((data) => setAvailable(data))
  }, [setAvailable])

  useEffect(() => {
    if (route === NAVIGATION.EXIT) setAuth(false)
  }, [route, setAuth])

  if (!available)
    return (
      <Flex alignItems="center" height="100vh" justifyContent="center" width="100%">
        <Spinner height="100px" width="100px" />
      </Flex>
    )

  if (!isLogin) return <Redirect to="/login" />

  return (
    <Container>
      <Flex paddingTop="150px" width="100%">
        <Menu
          active={route}
          items={[
            { key: 'Создать справку', value: NAVIGATION.CREATE_REFERENCE },
            { key: 'Калькулятор', value: NAVIGATION.CALCULATOR },
            { key: 'История', value: NAVIGATION.HISTORY },
            { key: 'Учет пациентов', value: NAVIGATION.MEDICAL_RECORDS },
            { key: 'Выйти', value: NAVIGATION.EXIT },
          ]}
          onChange={setRoute}
        />
        {route === undefined && <Greetings />}
        {route === NAVIGATION.HISTORY && <History />}
        {route === NAVIGATION.MEDICAL_RECORDS && <DoctorDiary />}
        {route === NAVIGATION.CALCULATOR && <Calculator />}
        {route === NAVIGATION.CREATE_REFERENCE && <References available={available} />}
      </Flex>
    </Container>
  )
}
