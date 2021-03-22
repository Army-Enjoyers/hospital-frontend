import { AsYouType } from 'libphonenumber-js'

export const removeSubsidiarySymbols = (input: string) => {
  return input.replace(/[\s/+]/g, '') // remove '+', '/', ' '
}

export const formatPhone = (phone: string) => {
  phone = removeSubsidiarySymbols(phone)
  if (!phone.length) return ''
  return new AsYouType().input('+' + phone)
}

export const range = (n: number) => [...Array(n).keys()]
