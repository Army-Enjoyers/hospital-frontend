import { useEffect, useState } from 'react'

interface IAuth {
  isLogin: boolean
  setAuth: (value: boolean) => void
}

export const useAuth = (): IAuth => {
  const [isLogin, setIsLogin] = useState((localStorage.getItem('isLogin') as any) as boolean)
  const setAuth = (value: boolean) => setIsLogin(value)
  useEffect(() => {
    if (isLogin) localStorage.setItem('isLogin', 'true')
    else localStorage.removeItem('isLogin')
  }, [isLogin])
  return {
    isLogin,
    setAuth,
  }
}
