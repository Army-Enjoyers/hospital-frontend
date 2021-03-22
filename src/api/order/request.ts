import { OrderAddress, OrderStatus } from './response'

export interface CreateOrder {
  number?: number
  status?: OrderStatus
  orderAddress: OrderAddress
  timePeriod?: string
  date?: string
  userPhoneNumber?: string
  products: { productId: string; quantityInOrder: number }[]
}
