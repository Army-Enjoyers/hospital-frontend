import React from 'react'
import { useIntl } from 'react-intl'
import { object, string } from 'yup'

import { Input } from '~/components'
import { TileLayout } from '~/layouts'
import { useForm } from '~/lib/hooks'

import translations from './Settings.i18n.json'
import styles from './Settings.module.scss'

interface Props {
  onSubmit: (values: { oldPassword?: string; newPassword?: string }) => void
  initialValues: { oldPassword?: string; newPassword?: string }
}

const validationSchema = object({
  oldPassword: string().required(),
  newPassword: string().required(),
}).required()

export const Settings: React.FC<Props> = ({ onSubmit, initialValues }) => {
  const intl = useIntl()
  const { field, submitProps } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
    <TileLayout
      cancelButton={{ text: intl.formatMessage(translations.cancel) }}
      submitButton={{
        text: intl.formatMessage(translations.submit),
        buttonProps: { ...submitProps },
      }}
    >
      <p className={styles.title}>{intl.formatMessage(translations.settings)}</p>
      <Input
        className={styles.input}
        label={intl.formatMessage(translations.oldPassword)}
        {...field('oldPassword')}
        isPassword
      />
      <Input
        className={styles.input}
        label={intl.formatMessage(translations.newPassword)}
        {...field('newPassword')}
        isPassword
      />
    </TileLayout>
  )
}
