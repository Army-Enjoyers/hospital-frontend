import cx from 'classnames'
import React from 'react'

import styles from './Select.module.scss'
import { icons } from './assets'

interface Props {
  text: string
  error?: string
  options: string[]
  value: string | undefined
  className: string
  onChange?: (value: string | undefined) => void
}

export const Select: React.FunctionComponent<Props> = ({
  text,
  error,
  value,
  options,
  className,
  onChange,
}) => {
  return (
    <div className={cx(className, styles.select, { [styles.inputError]: error })}>
      <p className={cx(styles.selectText)}>{text}</p>
      <img alt="Стрелка" className={cx(styles.selectDecoration)} src={icons.arrow} />
      <select
        className={styles.selectField}
        value={value}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
