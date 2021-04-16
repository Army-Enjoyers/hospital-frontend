import { AxiosInstance } from 'axios'

import { IJSONSchemaFormField, ISchemeMeta } from '~/types'

export interface IReferenceAPI {
  getFromJSONSchema: (schemeName: string) => Promise<IJSONSchemaFormField[]>
  getAvailableSchemes: () => Promise<ISchemeMeta[]>
}

const mockJSONSchema: IJSONSchemaFormField[] = [
  { type: 'input', id: 'firstName', name: 'Имя пациента' },
  {
    type: 'input',
    id: 'lastName',
    name: 'Фамилия пациента',
  },
  { type: 'radio', id: 'sex', name: 'Пол пациента', variants: ['Муж', 'Жен'] },
]

const mockSchemeMeta: ISchemeMeta[] = [
  { id: '0', name: 'Форма против ковида' },
  { id: '1', name: 'Форма за ковид' },
  { id: '2', name: 'Форма кибер ковид' },
]

export const ReferenceAPI = (client: AxiosInstance): IReferenceAPI => {
  console.log(client)
  return {
    async getFromJSONSchema(schemeId: string) {
      console.log(schemeId)
      return new Promise<IJSONSchemaFormField[]>((resolve) =>
        setTimeout(() => resolve(mockJSONSchema), 1000),
      )
    },
    async getAvailableSchemes() {
      return new Promise<ISchemeMeta[]>((resolve) =>
        setTimeout(() => resolve(mockSchemeMeta), 1000),
      )
    },
  }
}
