import { TextField } from '@material-ui/core'
import cx from 'classnames'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '~/components'
import { useBalance } from '~/providers'

import translations from './TotalBox.i18n.json'
import styles from './TotalBox.module.scss'
import { images } from './assets'

interface Props {
  totalPrice: number
  onSubmit: (date: string, time: string) => Promise<void>
}

export const TotalBox: React.FC<Props> = ({ totalPrice, onSubmit }) => {
  const intl = useIntl()

  const [date, setDate] = useState<string>(moment().add('1', 'days').format('YYYY-MM-DD'))
  const [time, setTime] = useState<string>('10:00')

  const { balance, balanceReceivedFromServer } = useBalance()

  const totalAmount = useMemo(() => {
    if (balance >= totalPrice || !balanceReceivedFromServer) return totalPrice
    return +((totalPrice - Math.max(0, balance)) * 1.05 + Math.max(0, balance))
  }, [totalPrice, balance, balanceReceivedFromServer])

  return (
    <div className={cx(styles.total)}>
      <div className={cx(styles.header)}>
        <div>{intl.formatMessage(translations.total)}</div>
        <div className={styles.totalAmount}>{totalAmount.toFixed(2)} Br</div>
      </div>
      <div className={cx(styles.form)}>
        <div className={cx(styles.input)}>
          <div className={cx(styles.label)}>{intl.formatMessage(translations.deliveryDate)}</div>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            className={cx(styles.picker)}
            type="date"
            value={date}
            onChange={(event) => setDate(event.currentTarget.value)}
          />
        </div>
        <div className={cx(styles.input)}>
          <div className={cx(styles.label)}>{intl.formatMessage(translations.deliveryTime)}</div>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            className={cx(styles.picker)}
            inputProps={{
              step: 1800,
            }}
            type="time"
            value={time}
            onChange={(event) => {
              const ROUNDING = 30 * 60 * 1000
              let current = moment().startOf('days').add(event.currentTarget.value)
              current = moment(Math.ceil(+current / ROUNDING) * ROUNDING)
              setTime(current.format('HH:mm'))
            }}
          />
          <TextField
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            className={cx(styles.picker)}
            inputProps={{
              step: 1800,
            }}
            type="time"
            value={moment(Date.now()).startOf('days').add(time).add('2', 'hours').format('HH:mm')}
          />
        </div>
        <Button
          className={cx(styles.button)}
          color="green"
          onClick={async () => {
            await onSubmit(date, time)
          }}
        >
          {intl.formatMessage(translations.order)}
        </Button>
      </div>
      <div className={cx(styles.privacy)}>
        <div className={cx(styles.icon)}>
          <img alt={intl.formatMessage(translations.privacyPolicy)} src={images.successImage} />
        </div>
        <div className={cx(styles.text)}>
          {intl.formatMessage(translations.privacyPolicy, {
            link: (
              <a
                className={styles.link}
                href="https://telegra.ph/Publichnaya-oferta-01-21"
                rel="noreferrer"
                target="_blank"
              >
                {intl.formatMessage(translations.privacyPolicyLink)}
              </a>
            ),
          })}
        </div>
      </div>
    </div>
  )
}
