import { AxiosInstance } from 'axios'
import { decamelizeKeys } from 'humps'

import { BankState } from '~/modules/Register/types'

import { CreateBank } from './request'

export interface UserBank {
  getBank: () => Promise<{ name: string; content: string }[]>
  createBank: (values: BankState) => Promise<unknown>
}

export const bankInitializer = (client: AxiosInstance, token: Promise<string | null>): UserBank => {
  return {
    async getBank() {
      const { data } = await client.get('/users/current/bank-account/', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return [
        {
          name: 'accountNumber',
          content: data.accountNumber,
        },
        {
          name: 'bankName',
          content: data.name,
        },
        {
          name: 'bankCode',
          content: data.code,
        },
        {
          name: 'bankAddress',
          content: data.bankAddress.address,
        },
        {
          name: 'bankIndex',
          content: data.bankAddress.index,
        },
      ]
    },
    async createBank(values: BankState) {
      const sendData: CreateBank = {
        name: values.name,
        accountNumber: values.account,
        code: values.code,
        bankAddress: {
          city: 'Minsk',
          address: values.address,
          index: values.postalCode,
        },
      }
      return await client.post('/users/current/bank-account/', decamelizeKeys(sendData), {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
    },
  }
}
