import { AxiosInstance } from 'axios'

import { AuthRequest } from './request'
import { AuthResponse } from './response'

export interface UserAuth {
  auth: (values: AuthRequest) => Promise<{ ok: boolean }>
  sendEmail: (values: { email: string }) => Promise<unknown>
}

export const authInitializer = (client: AxiosInstance): UserAuth => {
  return {
    async auth(values) {
      try {
        const { data } = await client.post<AuthResponse>('/auth/', values)
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
    async sendEmail({ email }) {
      return await client.post('/users/', {
        email,
      })
    },
  }
}
