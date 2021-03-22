import cx from 'classnames'
import React, { InputHTMLAttributes, useCallback, useState } from 'react'

import styles from './Input.module.scss'
import { icons } from './assets'
import { SIZE_MAP } from './types'

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'error' | 'size'> {
  error?: string | boolean
  label?: string
  onChange?: (
    text: string | undefined,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  className?: string
  format?: (text: string) => string
  size?: 'sm' | 'md' | 'lg'
  isPassword?: boolean
}

export const Input: React.FunctionComponent<Props> = ({
  label,
  error,
  isPassword,
  className,
  format,
  value,
  size = 'lg',
  onChange,
  ...props
}) => {
  const [kind, setKind] = useState(isPassword ? 'password' : 'text')

  const getIconDecoration = useCallback(() => {
    if (error) return icons.warning
    if (isPassword && kind === 'text') return icons.showed
    if (isPassword && kind === 'password') return icons.hidden
    return undefined /* Direct pointer what return */
  }, [kind, error, isPassword])

  return (
    <div className={cx(className, styles.input, { [styles.inputError]: error }, SIZE_MAP[size])}>
      {label && <p className={cx(styles.inputText)}>{label}</p>}
      <img
        className={cx(styles.inputDecoration)}
        src={getIconDecoration()}
        onClick={() => {
          if (!isPassword) return
          setKind(kind === 'text' ? 'password' : 'text')
        }}
      />
      <input
        className={styles.inputField}
        type={kind}
        value={value || ''}
        onChange={(e) => {
          onChange?.(format ? format(e.currentTarget.value ?? '') : e.currentTarget.value, e)
        }}
        {...props}
      />
    </div>
  )
}
