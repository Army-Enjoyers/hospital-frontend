import cx from 'classnames'
import React from 'react'

import { range } from '~/lib/format'

import styles from './Stepper.module.scss'
import { icons } from './assets'

interface Props {
  current: number
  max: number
  isPassed?: (index: number) => boolean
  onChange(value: number): void
}

export const Stepper: React.FunctionComponent<Props> = ({ onChange, current, isPassed, max }) => {
  return (
    <div className={styles.stepper}>
      {range(max).map((index) => (
        <div
          className={cx(
            styles.step,
            { [styles.active]: current === index },
            { [styles.passed]: isPassed?.(index) },
          )}
          key={index}
          onClick={() => onChange(index)}
        >
          <p className={styles.stepperIndex}>{index + 1}</p>
          <img className={styles.activeIcon} src={icons.active} />
          <img className={styles.passedIcon} src={icons.passed} />
          <img className={styles.emptyIcon} src={icons.empty} />
        </div>
      ))}
      <div className={styles.line} />
    </div>
  )
}
