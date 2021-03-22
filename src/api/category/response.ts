export interface CategoryResponse {
  results: { uuid: string; name: string }[]
}

export interface Category {
  name: string
  uuid: string
}
