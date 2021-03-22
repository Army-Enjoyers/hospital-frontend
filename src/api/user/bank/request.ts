export interface CreateBank {
  name: string
  accountNumber: string
  code: string
  bankAddress: BankAddress
}

export interface BankAddress {
  city: string
  address: string
  index: string
}
