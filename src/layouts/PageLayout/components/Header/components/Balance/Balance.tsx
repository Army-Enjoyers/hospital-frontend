import { Box, BoxProps, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useBalance } from '~/providers'

import translations from './Balance.i18n.json'
import { DotsLoader } from './components'

export const Balance: React.FC<BoxProps> = ({ ...props }) => {
  const intl = useIntl()
  const { balance, balanceReceivedFromServer } = useBalance()

  return (
    <Box width="max-content" {...props}>
      <Text fontSize="xs" minWidth="80px">
        {intl.formatMessage(translations.balance)}
      </Text>
      <Text fontSize="sm" fontWeight="500" minHeight="calc(1.5rem)">
        {balanceReceivedFromServer ? balance : <DotsLoader numberDots={6} />}
      </Text>
    </Box>
  )
}
