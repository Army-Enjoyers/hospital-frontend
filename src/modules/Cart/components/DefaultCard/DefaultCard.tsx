import cx from 'classnames'
import React from 'react'

import styles from './DefaultCard.module.scss'
import { images } from './assets'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void
}

export const DefaultCard: React.FC<Props> = ({ children, onClose, className }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.contentArea}>
          <div className={cx(className)}>{children}</div>
        </div>
      </div>
      {onClose && (
        <div className={cx(styles.closeArea)} onClick={onClose}>
          <img alt="Close" src={images.closeImage} />
        </div>
      )}
    </div>
  )
}
