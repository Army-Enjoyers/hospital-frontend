import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button, ControlBox } from '~/components'
import { useShoppingCart } from '~/providers'
import { ProductProps } from '~/types'

import translations from './ProductCard.i18n.json'
import styles from './ProductCard.module.scss'
import { ProductModal } from './components'

const NOT_EXISTS_VALUE = -1
const DEFAULT_PRODUCT_NUMBER_TO_ADD = 1

export const ProductCard: React.FC<ProductProps> = (props) => {
  const intl = useIntl()
  const { name, price, image } = props
  const [show, setShow] = useState(false)
  const { addProduct, getProductIndex, products, removeProduct } = useShoppingCart()

  const inCart = getProductIndex(props) !== NOT_EXISTS_VALUE
  const product = inCart ? products[getProductIndex(props)] : undefined

  const onAddToCartClick = () => {
    addProduct(DEFAULT_PRODUCT_NUMBER_TO_ADD, props)
  }

  const quantity = product?.quantity ?? 0

  const onCartChange = (value: number) => {
    if (!product) return
    const delta = quantity - value
    if (delta < 0) addProduct(-delta, product)
    else removeProduct(delta, product)
  }

  return (
    <>
      <div className={styles.productCard}>
        <div onClick={() => setShow(true)}>
          <div className={styles.image}>
            <img alt="Product" src={image} />
          </div>
          <p className={styles.title}>{name}</p>
        </div>
        <div>
          <p className={styles.price} onClick={() => setShow(true)}>
            {price + ' Br'}
          </p>
          {!inCart && (
            <Button className={styles.button} color="green" onClick={onAddToCartClick}>
              {intl.formatMessage(translations.button)}
            </Button>
          )}
          {inCart && <ControlBox value={quantity} onChange={onCartChange} />}
        </div>
      </div>
      <ProductModal
        inCart={inCart}
        show={show}
        onAddToCartClick={onAddToCartClick}
        onCartChange={onCartChange}
        onHide={() => setShow(false)}
        {...props}
        quantity={quantity}
      />
    </>
  )
}
