export interface OrderResponse {
  results: OrderProps[]
}

export interface OrderProps {
  uuid: string
  number?: number
  status: OrderStatus
  orderAddress: OrderAddress
  timePeriod: string
  date: string
  userPhoneNumber: string
  totalAmount: string
}

export enum OrderStatus {
  inProgress = 'in_progress',
  arrived = 'arrived',
}

export interface OrderAddress {
  city?: string
  address?: string
}
