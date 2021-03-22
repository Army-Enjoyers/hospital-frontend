import React from 'react'
import { useIntl } from 'react-intl'

import { OrderProps, OrderStatus } from '~/api/order/response'

import translations from './Order.i18n.json'
import styles from './Order.module.scss'

export const Order: React.FC<OrderProps> = ({
  orderAddress,
  number,
  date,
  timePeriod,
  totalAmount,
  status,
}) => {
  const intl = useIntl()
  return (
    <div className={styles.order}>
      <div className={styles.information}>
        <div className={styles.address}>{orderAddress.address}</div>
        <div className={styles.extra}>
          <div className={styles.column}>
            <p className={styles.title}>{intl.formatMessage(translations.orderNumber)}</p>
            <p className={styles.description}>{number}</p>
          </div>
          <div className={styles.column}>
            <p className={styles.title}>{intl.formatMessage(translations.orderDate)}</p>
            <p className={styles.description}>{date}</p>
          </div>
          <div className={styles.column}>
            <p className={styles.title}>{intl.formatMessage(translations.orderTime)}</p>
            <p className={styles.description}>{timePeriod}</p>
          </div>
          <div className={styles.column}>
            <p className={styles.title}>{intl.formatMessage(translations.orderPrice)}</p>
            <p className={styles.description}>{totalAmount}</p>
          </div>
        </div>
      </div>
      <div className={styles.status}>
        {status === OrderStatus.arrived && (
          <p className={styles.statusArrived}>{intl.formatMessage(translations.arrived)}</p>
        )}
        {status === OrderStatus.inProgress && (
          <p className={styles.statusInProgress}>{intl.formatMessage(translations.inProgress)}</p>
        )}
      </div>
    </div>
  )
}
