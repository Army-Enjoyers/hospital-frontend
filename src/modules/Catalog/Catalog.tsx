import { Flex, Box, Text } from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { createClient } from '~/api'
import { Category } from '~/api/category/response'
import { PageLayout } from '~/layouts'
import { useSearch } from '~/providers'
import { ProductProps } from '~/types'

import translations from './Catalog.i18n.json'
import { Option } from './components'
import { ProductCard } from './components'

export const Catalog = () => {
  const intl = useIntl()
  const [chosenCategory, setChosenCategory] = useState<string>()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      setCategories(await client.getCategories())
    }
    void handler()
  }, [setCategories])

  const { search } = useSearch()

  const getProducts = useCallback(
    debounce(async (search) => {
      const client = createClient()
      if (search !== '') setProducts(await client.getProducts(search))
      else setProducts(await client.getProducts(chosenCategory))
    }, 300),
    [chosenCategory],
  )

  useEffect(() => {
    void getProducts(search)
  }, [chosenCategory, search, getProducts])

  const chosenCategoryName = useMemo<string>(() => {
    const chosen = categories.find((category) => category.uuid === chosenCategory)
    return chosen?.name ?? intl.formatMessage(translations.products)
  }, [chosenCategory, intl, categories])

  return (
    <PageLayout>
      <Flex>
        <Box maxWidth="300px" minWidth="260px" width="max-content">
          <Text
            background="gray.50"
            cursor="pointer"
            fontSize="xl"
            fontWeight="600"
            padding="30px"
            onClick={() => setChosenCategory(undefined)}
          >
            {intl.formatMessage(translations.categories)}
          </Text>
          {categories.map((category) => (
            <Option
              key={category.name}
              name={category.name}
              selected={category.uuid === chosenCategory}
              value={category.uuid}
              onClick={(value) => setChosenCategory(value)}
            />
          ))}
        </Box>
        <Box background="gray.50" ml="30px" padding="40px" width="100%">
          <Text fontSize="xl" fontWeight="600" mb="20px">
            {chosenCategoryName}
          </Text>
          <Flex flexWrap="wrap" minHeight="100vh">
            {products.map((product, index) => (
              <ProductCard {...product} key={String(product.name + index)} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </PageLayout>
  )
}
