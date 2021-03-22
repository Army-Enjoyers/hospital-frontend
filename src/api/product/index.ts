import { AxiosInstance } from 'axios'

import config from '~/config'
import { ProductProps } from '~/types'

import { ProductResponse } from './response'
import { UNITS_MAP } from './types'

export interface Product {
  getProducts: (id?: string) => Promise<ProductProps[]>
}

export const ProductApi = (client: AxiosInstance, token: Promise<string | null>): Product => {
  return {
    async getProducts(id?: string) {
      try {
        const requestConfig = (await token)
          ? {
              headers: {
                Authorization: `Bearer ${await token}`,
              },
            }
          : {}
        const { data } = await client.get<ProductResponse>(
          id ? `/products/?search=${id}` : '/products/',
          requestConfig,
        )

        return data.results.map((product) => {
          return {
            ...product,
            units: UNITS_MAP[product.units],
            image: config.BASE_URL + product.image,
            category: product.categoryName,
          }
        })
      } catch (e) {
        return []
      }
    },
  }
}
