export interface ProductProps {
  uuid: string
  name: string
  description: string
  price: string
  codeNumber: string
  quantity: number
  minimumOrderValue: number
  units: string
  packageAmount: number
  composition: string
  producer: string
  image: string
  storageConditions: string
  expirationDate: string
  category: string
}

export interface PersonalProps {
  surname?: string
  name?: string
  fatherName?: string
  phone?: string
}
