import { Box } from '@chakra-ui/react'
import cx from 'classnames'
import React from 'react'

import { ControlBox } from '~/components'
import { ProductProps } from '~/types'

import { DefaultCard } from '../DefaultCard'

import styles from './OrderCard.module.scss'

interface Props extends ProductProps {
  onClose: () => void
  onPeacesChange: (value: number) => void
}

export const OrderCard: React.FC<Props> = ({
  quantity,
  price,
  name,
  image,
  onPeacesChange,
  onClose,
}) => {
  return (
    <DefaultCard className={cx(styles.order)} onClose={onClose}>
      <div className={cx(styles.productInfo)}>
        <img alt="order item" className={styles.productImage} src={image} />
        <div className={cx(styles.title)}>{name}</div>
      </div>
      <div className={cx(styles.userInfo)}>
        <ControlBox value={quantity} onChange={onPeacesChange} />
      </div>
      <Box color="green.50" fontSize="xl" fontWeight="600" width="100px">
        {price} Br
      </Box>
    </DefaultCard>
  )
}
