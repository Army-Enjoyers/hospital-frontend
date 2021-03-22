import React from 'react'
import { useIntl } from 'react-intl'
import { object, string } from 'yup'

import { Input, Select } from '~/components'
import { TileLayout } from '~/layouts'
import { useForm } from '~/lib/hooks'
import { CompanyState } from '~/modules/Register/types'

import translations from './Company.i18n.json'
import styles from './Company.module.scss'

interface Props {
  onCancel(): void
  onSubmit(values: unknown): void
  initialValues: CompanyState
}

const getSchema = () =>
  object({
    name: string().required(),
    locality: string().required(),
    address: string().required(),
    legalForm: string().required(),
    UNP: string().required(),
    postalCode: string().required(),
  })

export const Company: React.FunctionComponent<Props> = ({ onCancel, onSubmit, initialValues }) => {
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
            {...field('name')}
            className={styles.input}
            label={intl.formatMessage(translations.organizationName)}
          />
          <Select
            className={styles.input}
            {...field('legalForm')}
            options={['ИП', 'ООО', 'ЗАО', 'ОДО', 'ОАО']}
            text={intl.formatMessage(translations.legalForm)}
          />
          <Input
            {...field('UNP')}
            className={styles.input}
            label={intl.formatMessage(translations.UNP)}
            size="sm"
          />
        </div>
        <div className={styles.formColumn}>
          <Input
            className={styles.input}
            {...field('locality')}
            label={intl.formatMessage(translations.locality)}
          />
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
      <div className={styles.passwordRules} />
    </TileLayout>
  )
}
