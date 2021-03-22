import React, { useContext, useEffect, useState } from 'react'

import { ProductProps } from '~/types'

interface Values {
  products: (ProductProps & { quantity: number })[]
  totalPrice: number
}

interface Actions {
  addProduct: (quantity: number, product: ProductProps) => void
  removeProduct: (quantity: number, product: ProductProps) => void
  getProductIndex: (product: ProductProps) => number
  clearCart: () => void
  getProductCount: (product: ProductProps) => number
}

const NOT_EXISTS_VALUE = -1

const ShoppingCardContext = React.createContext<Values & Actions>({} as Values & Actions)

export const useShoppingCart = () => {
  const context = useContext(ShoppingCardContext)
  if (!context) throw new Error("[useShoppingCart] You can't use this hook outside the provider")
  return context
}

const getShoppingCartFromLocalStorage = () => {
  const products = localStorage.getItem('SHOPPING_CART')
  if (!products) return []
  return JSON.parse(products)
}

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<(ProductProps & { quantity: number })[]>(
    getShoppingCartFromLocalStorage(),
  )

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let sum = 0
    products.forEach(({ price, quantity }) => {
      sum += +price * quantity
    })
    setTotalPrice(sum)
  }, [products])

  const getProductIndex = (product: ProductProps) => {
    if (!products) return NOT_EXISTS_VALUE
    return products.findIndex(
      (comparedProduct) => comparedProduct.codeNumber === product.codeNumber,
    )
  }

  const getProductCount = (product: ProductProps) => {
    if (!products) return NOT_EXISTS_VALUE
    return products.findIndex(
      (comparedProduct) => comparedProduct.codeNumber === product.codeNumber,
    )
  }

  const addProduct = (quantity: number, product: ProductProps) => {
    if (!products) return
    const productIndex = getProductIndex(product)

    if (productIndex !== NOT_EXISTS_VALUE) {
      const newProducts = [...products]
      newProducts[productIndex].quantity += quantity
      setProducts(newProducts)
      return
    }

    const newProducts = [...products]
    newProducts.push({ ...product, quantity })
    setProducts(newProducts)
  }

  const clearCart = () => {
    setProducts([])
  }

  const removeProduct = (quantity: number, product: ProductProps) => {
    if (!products) return
    const productIndex = getProductIndex(product)
    if (productIndex === NOT_EXISTS_VALUE) return
    const newProducts = [...products]
    const delta = newProducts[productIndex].quantity - quantity
    if (delta > 0) {
      newProducts[productIndex].quantity -= quantity
      setProducts(newProducts)
    } else {
      setProducts(products.filter((_product, index) => index !== productIndex))
    }
  }

  useEffect(() => {
    localStorage.removeItem('SHOPPING_CART')
    localStorage.setItem('SHOPPING_CART', JSON.stringify(products))
  }, [products])

  return (
    <ShoppingCardContext.Provider
      value={{
        addProduct,
        removeProduct,
        getProductIndex,
        getProductCount,
        products,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </ShoppingCardContext.Provider>
  )
}
