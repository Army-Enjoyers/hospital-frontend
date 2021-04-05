import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

import { Container } from '~/layouts'

import { Calculator, DoctorDiary, Greetings, History, Menu, References } from './components'
import { NAVIGATION } from './types'

export const Home = () => {
  const [route, setRoute] = useState<NAVIGATION | undefined>()

  return (
    <Container>
      <Flex alignItems="center" paddingTop="150px" width="100%">
        <Menu
          active={route}
          items={[
            { key: 'Создать справку', value: NAVIGATION.CREATE_REFERENCE },
            { key: 'Калькулятор', value: NAVIGATION.CALCULATOR },
            { key: 'История', value: NAVIGATION.HISTORY },
            { key: 'Учет пациентов', value: NAVIGATION.MEDICAL_RECORDS },
          ]}
          onChange={setRoute}
        />
        {route === undefined && <Greetings />}
        {route === NAVIGATION.HISTORY && <History />}
        {route === NAVIGATION.MEDICAL_RECORDS && <DoctorDiary />}
        {route === NAVIGATION.CALCULATOR && <Calculator />}
        {route === NAVIGATION.CREATE_REFERENCE && <References />}
      </Flex>
    </Container>
  )
}
