import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { createClient } from '~/api'
import { Stepper } from '~/components'
import { Container } from '~/layouts'
import { removeSubsidiarySymbols } from '~/lib/format'
import { logout } from '~/lib/helpers'
import { getToken } from '~/lib/helpers/getToken'
import { useStatusModal } from '~/providers'

import translations from './Register.i18n.json'
import { User, Company, Bank, Email } from './components'
import { UserState, BankState, CompanyState, EmailState } from './types'

export const Register = () => {
  const [step, setStep] = useState<number>(0)
  const intl = useIntl()

  const [email, setEmail] = useState<EmailState>({
    email: '',
  })

  const [user, setUser] = useState<UserState>({
    surname: '',
    name: '',
    phone: '',
    fatherName: '',
    password: '',
  })
  const [company, setCompany] = useState<CompanyState>({
    name: '',
    locality: '',
    address: '',
    legalForm: 'ИП',
    UNP: '',
    postalCode: '',
  })
  const [bank, setBank] = useState<BankState>({
    account: '',
    address: '',
    name: '',
    postalCode: '',
    code: '',
  })

  const { closeModal, triggerStatus } = useStatusModal()

  const onEmailSubmit = async (values: EmailState) => {
    const client = createClient()
    try {
      await client.sendEmail({ email: values.email ?? '' })
      triggerStatus({
        title: intl.formatMessage(translations.confirmEmailTitle),
        description: intl.formatMessage(translations.confirmEmailDescription),
        onSubmit: closeModal,
      })
    } catch (e) {
      triggerStatus({
        title: intl.formatMessage(translations.emailExistsTitle),
        description: intl.formatMessage(translations.emailExistsDescription),
        onSubmit: closeModal,
      })
    }
    setEmail(values)
  }

  const onUserSubmit = (values: UserState) => {
    setUser(values)
    setStep(step + 1)
  }

  const onCompanySubmit = (values: CompanyState) => {
    setCompany(values)
    setStep(step + 1)
  }

  const onBankSubmit = async (values: BankState) => {
    setBank(values)
    const client = createClient()
    let registerCompleted = true
    try {
      void (await client.setPassword(user.password))
    } catch (e) {
      registerCompleted = false
      triggerStatus({
        description: intl.formatMessage(translations.passwordIncorrect),
      })
    }
    try {
      void (await client.createProfile({
        ...user,
        phone: removeSubsidiarySymbols('+' + user.phone),
      }))
    } catch (e) {
      registerCompleted = false
      triggerStatus({
        description: intl.formatMessage(translations.profileIncorrect),
      })
    }
    try {
      void (await client.createCompany(company))
    } catch (e) {
      registerCompleted = false
      triggerStatus({
        description: intl.formatMessage(translations.organizationIncorrect),
      })
    }
    try {
      void (await client.createBank(values))
    } catch (e) {
      registerCompleted = false
      triggerStatus({
        description: intl.formatMessage(translations.bankIncorrect),
      })
    }
    if (registerCompleted) {
      logout()
      window.location.href = '/'
    }
  }

  const onCancel = () => {
    setStep(step - 1)
  }

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const handler = async () => {
      setToken(await getToken())
      setLoading(true)
    }
    void handler()
  }, [setToken, setLoading])

  const [maxStep, setMaxStep] = useState(0)

  useEffect(() => {
    if (maxStep < step) setMaxStep(step)
  }, [step, setMaxStep, maxStep])

  if (!token && loading)
    return (
      <Container>
        <Email initialValues={email} onSubmit={onEmailSubmit} />
      </Container>
    )

  return (
    <Container maxWidth={['calc(100% - 40px)', 'calc(100% - 40px)', '600px', '770px']} py="35px">
      <Stepper
        current={step}
        isPassed={(index) => index <= maxStep}
        max={3}
        onChange={(index) => {
          if (index <= maxStep) {
            setStep(index)
          }
        }}
      />
      {step === 0 && (
        <User initialValues={user} key="user" onCancel={onCancel} onSubmit={onUserSubmit} />
      )}
      {step === 1 && (
        <Company
          initialValues={company}
          key="company"
          onCancel={onCancel}
          onSubmit={onCompanySubmit}
        />
      )}
      {step === 2 && (
        <Bank initialValues={bank} key="bank" onCancel={onCancel} onSubmit={onBankSubmit} />
      )}
    </Container>
  )
}
