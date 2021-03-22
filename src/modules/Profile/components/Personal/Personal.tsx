import React from 'react'
import { useIntl } from 'react-intl'
import { object, string } from 'yup'

import { Input } from '~/components'
import { TileLayout } from '~/layouts'
import { formatPhone, removeSubsidiarySymbols } from '~/lib/format'
import { useForm } from '~/lib/hooks'
import { phoneValidationRegex } from '~/lib/regex'
import { PersonalProps } from '~/types'

import translations from './Personal.i18n.json'
import styles from './Personal.module.scss'

interface Props {
  onSubmit: (value: PersonalProps) => void
  initialValues: PersonalProps
}

const validationSchema = object({
  name: string().required(),
  surname: string().required(),
  fatherName: string().required(),
  phone: string()
    .required()
    .transform((source) => removeSubsidiarySymbols(source))
    .matches(phoneValidationRegex),
}).required()

export const Personal: React.FC<Props> = ({ onSubmit, initialValues }) => {
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
      <p className={styles.title}>{intl.formatMessage(translations.personal)}</p>
      <Input
        className={styles.input}
        label={intl.formatMessage(translations.surname)}
        {...field('surname')}
      />
      <Input
        className={styles.input}
        label={intl.formatMessage(translations.name)}
        {...field('name')}
      />
      <Input
        className={styles.input}
        label={intl.formatMessage(translations.fatherName)}
        {...field('fatherName')}
      />
      <Input
        className={styles.input}
        format={formatPhone}
        {...field('phone')}
        label={intl.formatMessage(translations.phone)}
      />
    </TileLayout>
  )
}
