import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import React from 'react'

import { defaultTheme } from '~/theme'

import { IntlProvider } from './intl'

export const Providers: React.FC = ({ children }) => {
  return (
    <IntlProvider>
      <ChakraProvider theme={defaultTheme}>
        <CSSReset />{children}</StatusModalProvider>
      </ChakraProvider>
    </IntlProvider>
  )
}
