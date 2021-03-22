import axios from 'axios'
import { camelizeKeys } from 'humps'

import config from '~/config'
import { getToken } from '~/lib/helpers'

import { CategoryApi } from './category'
import { OrderApi } from './order'
import { ProductApi } from './product'
import { UserApi } from './user'

export const createClient = () => {
  const client = axios.create({ baseURL: config.API_URL })
  client.interceptors.response.use(({ data, ...response }) => {
    const parsed = camelizeKeys(data)
    return { data: parsed, ...response }
  })

  const token = getToken()
  return {
    ...CategoryApi(client),
    ...OrderApi(client, token),
    ...ProductApi(client, token),
    ...UserApi(client, token),
  }
}
