import { AxiosInstance } from 'axios'

import { UserAddress, addressInitializer } from './address'
import { UserAuth, authInitializer } from './auth'
import { UserBank, bankInitializer } from './bank'
import { UserCompany, companyInitializer } from './company'
import { UserPassword, passwordInitializer } from './password'
import { UserProfile, profileInitializer } from './profile'

export type User = UserAuth & UserBank & UserProfile & UserPassword & UserCompany & UserAddress

export const UserApi = (client: AxiosInstance, token: Promise<string | null>): User => {
  return {
    ...authInitializer(client),
    ...bankInitializer(client, token),
    ...profileInitializer(client, token),
    ...passwordInitializer(client, token),
    ...companyInitializer(client, token),
    ...addressInitializer(client, token),
  }
}
