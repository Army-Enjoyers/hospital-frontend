import { AxiosInstance } from 'axios'

import { AddressesResponse } from './response'
import { Address } from './types'

export interface UserAddress {
  getUserAddresses: () => Promise<Address[]>
}

export const addressInitializer = (
  client: AxiosInstance,
  token: Promise<string | null>,
): UserAddress => {
  return {
    async getUserAddresses() {
      const { data } = await client.get<AddressesResponse>('/users/current/addresses/', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return data.results
    },
  }
}
