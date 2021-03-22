import React, { useContext, useEffect, useState } from 'react'

import { createClient } from '~/api'

interface Values {
  balance: number
  balanceReceivedFromServer: boolean
}

const BalanceContext = React.createContext<Values>({} as Values)

export const useBalance = () => {
  const context = useContext(BalanceContext)
  if (!context) throw new Error("[useBalance] You can't use this hook outside the provider")
  return context
}

export const BalanceProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState(0)
  const [balanceReceivedFromServer, setBalanceReceivedFromServer] = useState(false)

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      try {
        const { balance } = await client.getBalance()
        setBalance(balance)
        setBalanceReceivedFromServer(true)
      } catch (e) {}
    }
    void handler()
  }, [])

  return (
    <BalanceContext.Provider value={{ balance, balanceReceivedFromServer }}>
      {children}
    </BalanceContext.Provider>
  )
}
