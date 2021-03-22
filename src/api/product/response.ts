export interface ProductResponse {
  results: {
    uuid: string
    name: string
    description: string
    codeNumber: string
    categoryName: string
    price: string
    quantity: number
    minimumOrderValue: number
    packageAmount: number
    units: 'kg' | 'l' | 'g' | 'ml' | 'pcs'
    composition: string
    producer: string
    image: string
    storageConditions: string
    expirationDate: string
  }[]
}
