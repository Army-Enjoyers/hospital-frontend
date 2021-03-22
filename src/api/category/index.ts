import { AxiosInstance } from 'axios'

import { Category, CategoryResponse } from './response'

export interface CategoryApi {
  getCategories: () => Promise<Category[]>
}

export const CategoryApi = (client: AxiosInstance): CategoryApi => {
  return {
    async getCategories() {
      try {
        const { data } = await client.get<CategoryResponse>('/categories/')
        return data.results ?? []
      } catch (e) {
        return []
      }
    },
  }
}
