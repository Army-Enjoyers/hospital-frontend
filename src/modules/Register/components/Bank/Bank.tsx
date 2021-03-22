import React from 'react'
import { useIntl } from 'react-intl'
import { object, string } from 'yup'

import { Input } from '~/components'
import { TileLayout } from '~/layouts'
import { useForm } from '~/lib/hooks'
import { BankState } from '~/modules/Register/types'

import translations from './Bank.i18n.json'
import styles from './Bank.module.scss'

interface Props {
  onCancel(): void
  onSubmit(values: unknown): void
  initialValues: BankState
}

const getSchema = () =>
  object({
    account: string().required(),
    address: string().required(),
    name: string().required(),
    postalCode: string().required(),
    code: string().required(),
  })

export const Bank: React.FunctionComponent<Props> = ({ onCancel, onSubmit, initialValues }) => {
  const intl = useIntl()

  const { field, submitProps } = useForm({
    initialValues: initialValues,
    validationSchema: getSchema(),
    onSubmit: onSubmit,
  })

  const cancelButton = {
    text: intl.formatMessage(translations.cancel),
    buttonProps: {
      onClick: onCancel,
    },
  }

  const submitButton = {
    text: intl.formatMessage(translations.next),
    buttonProps: submitProps,
  }

  return (
    <TileLayout cancelButton={cancelButton} submitButton={submitButton}>
      <p className={styles.title}>{intl.formatMessage(translations.title)}</p>
      <form className={styles.form}>
        <div className={styles.formColumn}>
          <Input
            className={styles.input}
            label={intl.formatMessage(translations.account)}
            {...field('account')}
          />
          <Input
            className={styles.input}
            label={intl.formatMessage(translations.name)}
            {...field('name')}
          />
          <Input
            className={styles.input}
            label={intl.formatMessage(translations.code)}
            size="sm"
            {...field('code')}
          />
        </div>
        <div className={styles.formColumn}>
          <Input
            className={styles.input}
            {...field('address')}
            label={intl.formatMessage(translations.address)}
          />
          <Input
            className={styles.input}
            type="number"
            {...field('postalCode')}
            label={intl.formatMessage(translations.postalCode)}
            size="sm"
          />
        </div>
      </form>
    </TileLayout>
  )
}
