import { AxiosInstance } from 'axios'

import { JSONSchemaFormField } from '~/types'

export interface IReferenceAPI {
  getFromJSONSchema: () => Promise<JSONSchemaFormField[]>
}

const mockJSONSchema: JSONSchemaFormField[] = [
  { type: 'input', name: 'firstName', inputProps: { placeholder: 'Имя' } },
  { type: 'input', name: 'lastName', inputProps: { placeholder: 'Фамилия' } },
  { type: 'radio', name: 'sex', variants: ['Муж', 'Жен'], inputProps: {} },
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
