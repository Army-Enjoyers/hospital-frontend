import { AxiosInstance } from 'axios'
import { decamelizeKeys } from 'humps'

import { CreateOrder } from './request'
import { OrderProps, OrderResponse } from './response'

export interface UserOrder {
  findOrders(search?: string): Promise<OrderProps[]>
  createOrder(createOrder: CreateOrder): Promise<OrderResponse>
}

export const OrderApi = (client: AxiosInstance, token: Promise<string | null>): UserOrder => {
  return {
    async findOrders(search?: string): Promise<OrderProps[]> {
      const { data } = await client.get<OrderResponse>(`/orders/?search='${search ?? ''}`, {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return data.results
    },
    async createOrder(createOrder: CreateOrder): Promise<OrderResponse> {
      const { data } = await client.post<OrderResponse>('/orders/', decamelizeKeys(createOrder), {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return data
    },
  }
}
