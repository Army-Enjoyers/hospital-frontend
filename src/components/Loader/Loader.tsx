import cx from 'classnames'
import React from 'react'

import { images } from '~/components/Loader/assets'

import styles from './Loader.module.scss'

interface Props {
  className?: string
}

export const Loader: React.FC<Props> = ({ className }) => {
  return <img alt="loading" className={cx(className, styles.loader)} src={images.round} />
}
