import React, { useState } from 'react'

import { Container } from '~/layouts'

import { Menu } from './components'
import { NAVIGATION } from './types'

export const Home = () => {
  const [route, setRoute] = useState<NAVIGATION>(NAVIGATION.HISTORY)

  return (
    <Container>
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
    </Container>
  )
}
