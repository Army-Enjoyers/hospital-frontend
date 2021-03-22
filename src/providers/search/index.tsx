import React, { useContext, useState } from 'react'

interface Values {
  search: string
}

interface Actions {
  setSearch: (value: string) => void
}

const SearchContext = React.createContext<Values & Actions>({} as Values & Actions)

export const SearchProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState<string>('')
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('[Search] cannot use')
  return context
}
