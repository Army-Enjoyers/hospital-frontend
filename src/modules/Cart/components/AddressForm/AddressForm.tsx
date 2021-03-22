import { Box, Flex, Text, Radio } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { IntlShape, useIntl } from 'react-intl'
import { object, string } from 'yup'

import { Address } from '~/api/user/address/types'
import { Input } from '~/components'
import { formatPhone, removeSubsidiarySymbols } from '~/lib/format'
import { useForm } from '~/lib/hooks'
import { phoneValidationRegex } from '~/lib/regex'

import { DefaultCard } from '../DefaultCard'

import translations from './AddressForm.i18n.json'

interface Props {
  initialValues: Omit<Address, 'uuid'>
  onChange: (values: Omit<Address, 'uuid'>) => void
  value: string
}

const getSchema = (intl: IntlShape) =>
  object({
    city: string().required(),
    address: string().required(),
    phone: string()
      .required()
      .transform((source) => removeSubsidiarySymbols(source))
      .matches(
        phoneValidationRegex,
        intl.formatMessage(translations.incorrect, { field: 'telephone' }),
      ),
  }).required()

export const AddressForm: React.FC<Props> = ({ initialValues, onChange, value }) => {
  const intl = useIntl()
  const { field, formik } = useForm({
    initialValues: initialValues,
    validationSchema: getSchema(intl),
    onSubmit: console.log,
  })
  useEffect(() => {
    onChange(formik.values)
  }, [formik.values])
  return (
    <DefaultCard>
      <Flex width="100%">
        <Radio value={value} />
        <Box ml="35px" width="150px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.city)}
          </Text>
          <Text fontWeight="500">{initialValues.city}</Text>
        </Box>
        <Box ml="55px" width="207px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.address)}
          </Text>
          <Input {...field('address')} size="md" />
        </Box>
        <Box ml="55px" width="165px">
          <Text fontSize="sm" opacity="0.6">
            {intl.formatMessage(translations.phone)}
          </Text>
          <Input format={formatPhone} {...field('phone')} size="sm" />
        </Box>
      </Flex>
    </DefaultCard>
  )
}
