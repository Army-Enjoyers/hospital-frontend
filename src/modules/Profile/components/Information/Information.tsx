import React from 'react'

import { TileLayout } from '~/layouts'

import styles from './Information.module.scss'

interface Props {
  title: string
  references?: {
    name: string
    content: string
  }[]
}

export const Information: React.FC<Props> = ({ title, references }) => {
  return (
    <TileLayout>
      <p className={styles.title}>{title}</p>
      {references?.map(({ name, content }) => (
        <>
          <p className={styles.referenceName}>{name}</p>
          <p className={styles.referenceContent}>{content}</p>
        </>
      ))}
    </TileLayout>
  )
}
