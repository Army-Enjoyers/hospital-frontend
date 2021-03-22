import { Box, Flex, RadioGroup, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { createClient } from '~/api'
import { Address } from '~/api/user/address/types'
import { PageLayout } from '~/layouts'
import { removeSubsidiarySymbols } from '~/lib/format'
import { useShoppingCart, useStatusModal } from '~/providers'

import translations from './Cart.i18n.json'
import { TotalBox, PromptCard, OrderCard, AddressForm, AddressCard } from './components'

const defaultCity = 'Минск'

export const Cart: React.FC = () => {
  const intl = useIntl()
  const { products, removeProduct, addProduct, totalPrice, clearCart } = useShoppingCart()
  const [address, setAddress] = useState<Address>({ city: defaultCity })
  const [addresses, setAddresses] = useState<Address[]>([])
  const [active, setActive] = useState<string>('0')
  const { triggerStatus } = useStatusModal()
  const onSubmit = async (date: string, timePeriod: string) => {
    if (!address?.address || !address.city || !address.phone) {
      triggerStatus({
        description: intl.formatMessage(translations.validationError),
      })
      return
    }
    const client = createClient()
    try {
      await client.createOrder({
        orderAddress: {
          city: defaultCity,
          address: address.address,
        },
        products: products.map(({ quantity, uuid }) => {
          return {
            quantityInOrder: quantity,
            productId: uuid,
          }
        }),
        date: date,
        timePeriod: `${timePeriod}-${moment(Date.now())
          .startOf('days')
          .add(timePeriod)
          .add('2', 'hours')
          .format('HH:mm')}`,
        userPhoneNumber: removeSubsidiarySymbols(address.phone ?? ''),
      })
      clearCart()
      triggerStatus({
        description: intl.formatMessage(translations.successSendDelivery),
      })
    } catch (e) {
      triggerStatus({
        description: intl.formatMessage(translations.error),
      })
    }
  }

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      const addresses = await client.getUserAddresses()
      setAddresses(addresses)
    }
    void handler()
  }, [])

  useEffect(() => {
    if (active === '0') {
      setAddress({ city: 'Минск' })
      return
    }
    if (!addresses.length) return
    if (active !== '0') {
      setAddress(addresses[+active - 1])
    }
  }, [active, setAddress, addresses])

  return (
    <PageLayout>
      <Flex background="gray.50" borderRadius="8px" mt="15px" p="30px">
        <Box width="100%">
          <Box pr="30px" width="100%">
            <Text fontSize="xl" fontWeight="600" mb="30px">
              {intl.formatMessage(translations.cartTitle)}
            </Text>
            <Box>
              <PromptCard />
              {products.map((product) => (
                <OrderCard
                  {...product}
                  key={product.name}
                  price={String((+product.price * product.quantity).toFixed(2))}
                  onClose={() => removeProduct(product.quantity, product)}
                  onPeacesChange={(value) => {
                    const delta = product.quantity - value
                    if (delta < 0) addProduct(-delta, product)
                    else removeProduct(delta, product)
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box mt="40px">
            <Text fontSize="xl" fontWeight="600" mb="30px">
              {intl.formatMessage(translations.deliveryAddressTitle)}
            </Text>
            <Box mr="20px">
              <RadioGroup
                value={active}
                onChange={(nextValue) => {
                  setActive(String(nextValue))
                }}
              >
                <AddressForm
                  initialValues={{ city: 'Минск' }}
                  value="0"
                  onChange={(data) => {
                    if (active === '0') setAddress(data)
                  }}
                />
                <Box mt="20px">
                  {addresses.map((address, index) => {
                    return (
                      <AddressCard value={String(index + 1)} {...address} key={address.address} />
                    )
                  })}
                </Box>
              </RadioGroup>
            </Box>
          </Box>
        </Box>
        <TotalBox totalPrice={totalPrice} onSubmit={onSubmit} />
      </Flex>
    </PageLayout>
  )
}
