export interface CreateCompany {
  enterpriseType: string
  enterpriseName: string
  enterpriseUnp: string
  enterpriseAddress: CompanyAddress
}

export interface CompanyAddress {
  city?: string
  address: string
  index: string
}
