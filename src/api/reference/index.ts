import { AxiosInstance } from 'axios'

import { JSONSchemaFormField } from '~/types'

export interface IReferenceAPI {
  getFromJSONSchema: () => Promise<JSONSchemaFormField[]>
}

const mockJSONSchema: JSONSchemaFormField[] = [
  { type: 'input', id: 'firstName', name: 'Имя пациента' },
  {
    type: 'input',
    id: 'lastName',
    name: 'Фамилия пациента',
  },
  { type: 'radio', id: 'sex', name: 'Пол пациента', variants: ['Муж', 'Жен'] },
]

export const ReferenceAPI = (client: AxiosInstance): IReferenceAPI => {
  console.log(client)
  return {
    async getFromJSONSchema() {
      return new Promise<JSONSchemaFormField[]>((resolve) =>
        setTimeout(() => resolve(mockJSONSchema), 1000),
      )
    },
  }
}
