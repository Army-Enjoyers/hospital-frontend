import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import React from 'react'

import { defaultTheme } from '~/theme'

import { BalanceProvider } from './balance'
import { IntlProvider } from './intl'
import { SearchProvider } from './search'
import { ShoppingCartProvider } from './shopping-cart'
import { StatusModalProvider } from './status-modal'

export const Providers: React.FC = ({ children }) => {
  return (
    <IntlProvider>
      <ChakraProvider theme={defaultTheme}>
        <CSSReset />
        <ShoppingCartProvider>
          <BalanceProvider>
            <SearchProvider>
              <StatusModalProvider>{children}</StatusModalProvider>
            </SearchProvider>
          </BalanceProvider>
        </ShoppingCartProvider>
      </ChakraProvider>
    </IntlProvider>
  )
}
