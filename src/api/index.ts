import axios from 'axios'

import config from '~/config'

import { IReferenceAPI, ReferenceAPI } from './reference'

type ICreateClient = IReferenceAPI

export const createClient = (): ICreateClient => {
  const client = axios.create({ baseURL: config.BASE_URL })
  return {
    ...ReferenceAPI(client),
  }
}
