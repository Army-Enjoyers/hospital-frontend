import cx from 'classnames'
import React from 'react'

import styles from './Icon.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  notifications?: number
  image: string
}

export const Icon: React.FC<Props> = ({ notifications, image }) => {
  return (
    <div className={cx(styles.icon_layout)}>
      {notifications && (
        <span className={cx(styles.notifications)}>
          <p>{notifications}</p>
        </span>
      )}
      <img className={styles.icon} src={image} />
    </div>
  )
}
