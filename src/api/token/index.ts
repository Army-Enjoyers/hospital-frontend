import axios from 'axios'

import { AuthResponse } from '~/api/user/auth/response'
import config from '~/config'

interface Auth {
  authCheck: (token: string | null) => Promise<{ ok: boolean }>
  refresh: (token: string | null) => Promise<{ ok: boolean }>
}

export const createClient = (): Auth => {
  const client = axios.create({ baseURL: config.API_URL })

  return {
    async authCheck(token: string | null) {
      if (!token) return { ok: false }
      try {
        await client.post('/auth/check/', { token })
        return {
          ok: true,
        }
      } catch (e) {
        return {
          ok: false,
        }
      }
    },
    async refresh(refresh: string | null) {
      if (!refresh) return { ok: false }
      try {
        const { data } = await client.post<AuthResponse>('/auth/token/refresh/', refresh)
        localStorage.setItem('ACCESS', data.access)
        localStorage.setItem('REFRESH', data.refresh)
        return {
          ok: true,
        }
      } catch (e) {
        return {
          ok: false,
        }
      }
    },
  }
}
