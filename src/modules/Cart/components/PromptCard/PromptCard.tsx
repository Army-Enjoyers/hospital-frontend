import cx from 'classnames'
import React from 'react'
import { useIntl } from 'react-intl'

import { DefaultCard } from '../DefaultCard'

import translation from './PromptCard.i18n.json'
import styles from './PromptCard.module.scss'
import { images } from './assets'

export const PromptCard: React.FC = () => {
  const intl = useIntl()
  return (
    <DefaultCard className={cx(styles.prompt)}>
      <img alt="Money" src={images.handImage} />
      <div className={cx(styles.content)}>
        <div className={cx(styles.title)}>{intl.formatMessage(translation.promptTitle)}</div>
        <div className={cx(styles.text)}>{intl.formatMessage(translation.promptText)}</div>
      </div>
    </DefaultCard>
  )
}
