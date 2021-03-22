import cx from 'classnames'
import React from 'react'

import { Loader } from '~/components/Loader'

import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'green'
  outlined?: boolean
  loading?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  color = 'primary',
  outlined,
  className,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(className, styles.button, styles[color], { [styles.outlined]: outlined })}
    >
      {loading ? <Loader /> : <>{children}</>}
    </button>
  )
}
