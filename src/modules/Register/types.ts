export interface UserState {
  surname: string
  name: string
  phone: string
  fatherName: string
  password: string
}

export interface CompanyState {
  name: string
  locality: string
  address: string
  legalForm: string
  UNP: string
  postalCode: string
}

export interface BankState {
  account: string
  address: string
  name: string
  postalCode: string
  code: string
}

export interface EmailState {
  email?: string
}
