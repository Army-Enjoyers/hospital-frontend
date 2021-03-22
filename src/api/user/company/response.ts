export interface OrganizationResponse {
  uuid: string
  enterpriseType: string
  enterpriseName: string
  enterpriseUnp: string
  enterpriseAddress: {
    uuid: string
    city: string
    address: string
    index: string
  }
}
