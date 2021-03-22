import cx from 'classnames'
import React, { HTMLProps } from 'react'

import styles from './Option.module.scss'

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'onClick' | 'style' | 'selected'> {
  name: string
  value: any
  onClick: (value: any) => void
  selected?: boolean
  style?: 'gray' | 'white'
  first?: boolean
}

export const Option: React.FC<Props> = ({
  name,
  value,
  onClick,
  selected,
  style = 'gray',
  first,
  ...props
}) => {
  return (
    <div
      className={cx(
        styles.option,
        { [styles.selected]: selected },
        { [styles.gray]: style === 'gray' },
        { [styles.white]: style === 'white' },
        { [styles.first]: first },
      )}
      onClick={() => {
        onClick(value)
      }}
      {...props}
    >
      {name}
    </div>
  )
}
