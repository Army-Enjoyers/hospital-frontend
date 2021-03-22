import { AxiosInstance } from 'axios'
import humps from 'humps'

import { PersonalProps } from '~/types'

import { CreateProfile, UpdateProfile } from './request'
import { ProfileResponse } from './response'

export interface UserProfile {
  getProfile: () => Promise<PersonalProps>
  createProfile: (values: PersonalProps) => Promise<unknown>
  updateProfile: (values: PersonalProps) => Promise<unknown>
  getBalance: () => Promise<{ balance: number }>
}

export const profileInitializer = (
  client: AxiosInstance,
  token: Promise<string | null>,
): UserProfile => {
  return {
    async getProfile() {
      const { data } = await client.get<ProfileResponse>('/users/current/profile-details/', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return {
        name: data.firstName,
        surname: data.lastName,
        fatherName: data.fatherName,
        phone: data.phoneNumber,
      }
    },
    async createProfile(values: PersonalProps) {
      const sendData: CreateProfile = {
        firstName: values.name,
        lastName: values.surname,
        fatherName: values.fatherName,
        phoneNumber: values.phone,
      }
      return await client.post('/users/current/profile/', humps.decamelizeKeys(sendData), {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
    },
    async updateProfile(values: PersonalProps) {
      const sendData: UpdateProfile = {
        firstName: values.name,
        lastName: values.surname,
        fatherName: values.fatherName,
        phoneNumber: values.phone,
      }
      return await client.put('/users/current/profile-details/', humps.decamelizeKeys(sendData), {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
    },
    async getBalance() {
      const { data } = await client.get<{ balance: number }>('/users/current/check-balance/', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return data
    },
  }
}
