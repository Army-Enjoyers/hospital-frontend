import { createClient } from '~/api/token'

export const getToken = async (): Promise<null | string> => {
  const currentSearch = new URLSearchParams(window.location.search)
  const tokenInSearch = currentSearch.get('token')
  if (tokenInSearch) {
    localStorage.setItem('ACCESS', tokenInSearch)
  }
  const client = createClient()
  const token = localStorage.getItem('ACCESS')
  const refresh = localStorage.getItem('REFRESH')
  const data = await client.authCheck(token)
  if (!data.ok) {
    const data = await client.refresh(refresh)
    if (!data.ok) return null
    return localStorage.getItem('ACCESS')
  }
  return token
}
