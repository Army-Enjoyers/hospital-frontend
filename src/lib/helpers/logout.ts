export const logout = () => {
  localStorage.removeItem('ACCESS')
  localStorage.removeItem('REFRESH')
  window.location.href = '/'
  window.location.search = ''
}
