export interface BankResponse {
  uuid: string
  name: string
  accountNumber: string
  code: string
  bankAddress: {
    uuid: string
    city: string
    address: string
    index: string
  }
}
