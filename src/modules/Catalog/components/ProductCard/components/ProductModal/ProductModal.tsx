import React from 'react'
import Modal, { ModalProps } from 'react-bootstrap/cjs/Modal'
import { useIntl } from 'react-intl'

import { Button, ControlBox } from '~/components'
import { ProductProps } from '~/types'

import translations from './ProductModal.i18n.json'
import styles from './ProductModal.module.scss'

interface Props extends ModalProps, ProductProps {
  inCart: boolean
  quantity: number
  onCartChange: (value: number) => void
  onAddToCartClick: () => void
}

export const ProductModal: React.FC<Props> = ({
  name,
  image,
  codeNumber,
  price,
  category,
  producer,
  units,
  composition,
  expirationDate,
  storageConditions,
  description,
  packageAmount,
  inCart,
  quantity,
  onCartChange,
  onAddToCartClick,
  ...props
}) => {
  const intl = useIntl()
  return (
    <Modal {...props}>
      <div className={styles.modal}>
        <p className={styles.title}>{name}</p>
        <div className={styles.chiefInformation}>
          <img alt="tovar" className={styles.productImage} src={image} />
          <div className={styles.business}>
            <div>
              <div className={styles.curve}>
                <p className={styles.curveTitle}>{intl.formatMessage(translations.codeNumber)}</p>
                <p className={styles.curveDescription}>{codeNumber}</p>
              </div>
              <div className={styles.curve}>
                <p className={styles.curveTitle}>{intl.formatMessage(translations.category)}</p>
                <p className={styles.curveDescription}>{category}</p>
              </div>
              <div className={styles.curve}>
                <p className={styles.curveTitle}>
                  {intl.formatMessage(translations.packageAmount)}
                </p>
                <p className={styles.curveDescription}>{`${packageAmount} ${units}`}</p>
              </div>
              <div className={styles.curve}>
                <p className={styles.curveTitle}>{intl.formatMessage(translations.composition)}</p>
                <p className={styles.curveDescription}>{composition}</p>
              </div>
            </div>
            <div>
              <div className={styles.price}>{price + ' Br'}</div>
              {!inCart && (
                <Button color="green" onClick={onAddToCartClick}>
                  {intl.formatMessage(translations.button)}
                </Button>
              )}
              {inCart && <ControlBox value={quantity} onChange={onCartChange} />}
            </div>
          </div>
        </div>
        <div className={styles.characteristics}>
          <p className={styles.title}>{intl.formatMessage(translations.characteristics)}</p>
          <div className={styles.content}>
            <div className={styles.curve}>
              <p className={styles.curveTitle}>{intl.formatMessage(translations.producer)}</p>
              <p className={styles.curveDescription}>{producer}</p>
            </div>{' '}
            <div className={styles.curve}>
              <p className={styles.curveTitle}>{intl.formatMessage(translations.expirationDate)}</p>
              <p className={styles.curveDescription}>{expirationDate}</p>
            </div>{' '}
            <div className={styles.curve}>
              <p className={styles.curveTitle}>
                {intl.formatMessage(translations.storageConditions)}
              </p>
              <p className={styles.curveDescription}>{storageConditions}</p>
            </div>{' '}
            <div className={styles.curve}>
              <p className={styles.curveTitle}>{intl.formatMessage(translations.description)}</p>
              <p className={styles.curveDescription}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
