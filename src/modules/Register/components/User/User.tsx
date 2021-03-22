import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl, IntlShape } from 'react-intl'
import { object, string } from 'yup'

import { Input } from '~/components'
import { TileLayout } from '~/layouts'
import { formatPhone, range, removeSubsidiarySymbols } from '~/lib/format'
import { useForm } from '~/lib/hooks'
import { phoneValidationRegex } from '~/lib/regex'
import { UserState } from '~/modules/Register/types'

import translations from './User.i18n.json'
import styles from './User.module.scss'
import { PasswordRule } from './components'

interface Props {
  initialValues: UserState
  onCancel(): void
  onSubmit(values: unknown): void
}

const getSchema = (intl: IntlShape) =>
  object({
    surname: string().required(),
    name: string().required(),
    phone: string()
      .required()
      .transform((source) => removeSubsidiarySymbols(source))
      .matches(
        phoneValidationRegex,
        intl.formatMessage(translations.incorrect, { field: 'Phone' }),
      ),
    fatherName: string().required(),
    password: string().required(),
    passwordConfirm: string().required(),
  }).required()

export const User: React.FunctionComponent<Props> = ({ onCancel, onSubmit, initialValues }) => {
  const intl = useIntl()

  const [passwordRules, setPasswordRules] = useState<{
    minLength?: boolean
    hasUpperCaseAndLowerCase?: boolean
    hasSymbolOrDigit?: boolean
  }>({})

  const { field, submitProps, formik } = useForm({
    initialValues: initialValues,
    validationSchema: getSchema(intl),
    onSubmit: onSubmit,
    additionalValidation: (values) => {
      const errors: { password?: boolean; passwordConfirm?: string } = {}
      Object.entries(passwordRules).forEach(([, value]) => {
        if (!value) errors.password = true
      })
      if (values.password != values.passwordConfirm) errors.passwordConfirm = "doesn't match"
      return errors
    },
  })

  useEffect(() => {
    const password = String(formik.values.password)
    if (password) {
      const rules = {
        minLength: false,
        hasSymbolOrDigit: false,
        hasUpperCaseAndLowerCase: false,
      }
      if (password.length >= 8) {
        rules.minLength = true
      }
      const lowerCaseAndUpperCase = {
        lowerCase: false,
        upperCase: false,
      }
      range(password.length).forEach((index) => {
        const char = password.charAt(index)
        if (char >= '0' && char <= '9') rules.hasSymbolOrDigit = true
        if ('!$%^&*()_+|~-=`{}[]:";\'<>?,./'.includes(char)) rules.hasSymbolOrDigit = true
        if (char >= 'a' && char <= 'z') lowerCaseAndUpperCase.lowerCase = true
        if (char >= 'A' && char <= 'Z') lowerCaseAndUpperCase.upperCase = true
      })
      if (Object.keys(lowerCaseAndUpperCase).length === 2) rules.hasUpperCaseAndLowerCase = true
      setPasswordRules(rules)
    }
  }, [formik.values, setPasswordRules])

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
            {...field('surname')}
            className={styles.input}
            label={intl.formatMessage(translations.surname)}
          />
          <Input
            {...field('name')}
            className={styles.input}
            label={intl.formatMessage(translations.name)}
          />
          <Input
            {...field('fatherName')}
            className={styles.input}
            label={intl.formatMessage(translations.fatherName)}
          />
        </div>
        <div className={styles.formColumn}>
          <Input
            {...field('phone')}
            className={styles.input}
            format={formatPhone}
            label={intl.formatMessage(translations.phone)}
            size="sm"
          />
          <Input
            {...field('password')}
            isPassword
            className={styles.input}
            label={intl.formatMessage(translations.password)}
          />
          <Input
            isPassword
            {...field('passwordConfirm')}
            className={styles.input}
            label={intl.formatMessage(translations.repeatPassword)}
          />
        </div>
      </form>
      <Box mt="35px">
        <Text fontSize="sm" fontWeight="600">
          {intl.formatMessage(translations.rulesTitle)}
        </Text>
        <PasswordRule approved={passwordRules.minLength}>
          {intl.formatMessage(translations.firstRule)}
        </PasswordRule>
        <PasswordRule approved={passwordRules.hasUpperCaseAndLowerCase}>
          {intl.formatMessage(translations.secondRule)}
        </PasswordRule>
        <PasswordRule approved={passwordRules.hasSymbolOrDigit}>
          {intl.formatMessage(translations.thirdRule)}
        </PasswordRule>
      </Box>
    </TileLayout>
  )
}
