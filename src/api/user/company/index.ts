import { AxiosInstance } from 'axios'
import { decamelizeKeys } from 'humps'

import { CompanyState } from '~/modules/Register/types'

import { CreateCompany } from './request'
import { OrganizationResponse } from './response'
import { LegalForm, ORGANIZATION_MAP } from './types'

export interface UserCompany {
  getOrganization: () => Promise<{ name: string; content: string }[]>
  createCompany: (values: CompanyState) => Promise<unknown>
}

export const companyInitializer = (
  client: AxiosInstance,
  token: Promise<string | null>,
): UserCompany => {
  return {
    async getOrganization() {
      const { data } = await client.get<OrganizationResponse>('/users/current/enterprise/', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      return [
        {
          name: 'organizationType',
          content: data.enterpriseType,
        },
        {
          name: 'organizationName',
          content: data.enterpriseName,
        },
        {
          name: 'organizationUNP',
          content: data.enterpriseUnp,
        },
        {
          name: 'organizationCity',
          content: data.enterpriseAddress.city,
        },
        {
          name: 'organizationAddress',
          content: data.enterpriseAddress.address,
        },
        {
          name: 'organizationIndex',
          content: data.enterpriseAddress.address,
        },
      ]
    },
    async createCompany(values: CompanyState) {
      const sendData: CreateCompany = {
        enterpriseType: ORGANIZATION_MAP[values.legalForm as keyof LegalForm],
        enterpriseName: values.name,
        enterpriseUnp: values.UNP,
        enterpriseAddress: {
          // city: 'Minsk',
          address: values.address,
          index: values.postalCode,
        },
      }
      return await client.post('/users/current/enterprise/', decamelizeKeys(sendData), {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
    },
  }
}
