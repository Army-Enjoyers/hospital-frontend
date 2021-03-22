import { Flex, Radio, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Address } from '~/api/user/address/types'

import { DefaultCard } from '../DefaultCard'

import translations from './AddressCard.i18n.json'

interface Props extends Address {
  value: string
}

export const AddressCard: React.FC<Props> = ({ city, address, phone, value }) => {
  const intl = useIntl()
  return (
    <DefaultCard>
      <Flex width="100%">
        <Radio value={value} />
        <Box ml="35px" width="150px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.city)}
          </Text>
          <Text fontWeight="500">{city}</Text>
        </Box>
        <Box ml="55px" width="207px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.address)}
          </Text>
          <Text fontWeight="500">{address}</Text>
        </Box>
        <Box ml="55px" width="165px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.phone)}
          </Text>
          <Text fontWeight="500">{phone}</Text>
        </Box>
      </Flex>
    </DefaultCard>
  )
}
