import React, { useCallback, useEffect, useState } from 'react'
import { IntlShape, useIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'

import { createClient } from '~/api'
import { Option } from '~/components'
import { PageLayout } from '~/layouts'
import { getToken } from '~/lib/helpers'
import { useStatusModal } from '~/providers'
import { PersonalProps } from '~/types'

import translations from './Profile.i18n.json'
import styles from './Profile.module.scss'
import { Information, Personal, Settings } from './components'

const getReferences = (intl: IntlShape, state: { name: string; content: string }[]) => {
  return state.map(({ name, content }) => {
    return {
      name: intl.formatMessage(translations[name as keyof typeof translations]),
      content,
    }
  })
}

export const Profile: React.FC = () => {
  const intl = useIntl()

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const handler = async () => {
      setToken(await getToken())
      setLoading(true)
    }
    void handler()
  }, [setToken, setLoading])

  const [option, setOption] = useState('0')
  const [bank, setBank] = useState<{ name: string; content: string }[]>([])
  const [organization, setOrganization] = useState<{ name: string; content: string }[]>([])
  const [personal, setPersonal] = useState<PersonalProps | null>(null)

  const { triggerStatus } = useStatusModal()

  const saveInformation = useCallback(
    (status: 'success' | 'error') => {
      triggerStatus({
        description:
          status === 'success'
            ? intl.formatMessage(translations.successSavingInformation)
            : intl.formatMessage(translations.errorSavingInformation),
      })
    },
    [triggerStatus, intl],
  )

  const onPersonalSubmit = async (values: PersonalProps) => {
    try {
      const client = createClient()
      await client.updateProfile(values)
      saveInformation('success')
    } catch (e) {
      saveInformation('error')
    }
  }

  const onSettingsSubmit = async (values: { oldPassword?: string; newPassword?: string }) => {
    try {
      const client = createClient()
      await client.updatePassword(values)
      saveInformation('success')
    } catch (e) {
      saveInformation('error')
    }
  }

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      const data = await client.getProfile()
      setPersonal(data)
    }
    void handler()
  }, [setPersonal])

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      const data = await client.getBank()
      setBank(data)
    }
    void handler()
  }, [setBank])

  useEffect(() => {
    const client = createClient()
    const handler = async () => {
      const data = await client.getOrganization()
      setOrganization(data)
    }
    void handler()
  }, [setOrganization])

  if (!token && loading) return <Redirect to="/login" />

  return (
    <PageLayout footerOff>
      <div className={styles.container}>
        <div className={styles.menu}>
          {option === '0' && personal && (
            <Personal initialValues={personal} onSubmit={onPersonalSubmit} />
          )}
          {option === '1' && (
            <Information
              references={getReferences(intl, organization)}
              title={intl.formatMessage(translations.organization)}
            />
          )}
          {option === '2' && (
            <Information
              references={getReferences(intl, bank)}
              title={intl.formatMessage(translations.requisites)}
            />
          )}
          {option === '3' && (
            <Settings
              initialValues={{ oldPassword: '', newPassword: '' }}
              onSubmit={onSettingsSubmit}
            />
          )}
        </div>
        <div className={styles.options}>
          <Option
            name={intl.formatMessage(translations.personal)}
            selected={option === '0'}
            value="0"
            onClick={setOption}
          />
          <Option
            name={intl.formatMessage(translations.organization)}
            selected={option === '1'}
            value="1"
            onClick={setOption}
          />
          <Option
            name={intl.formatMessage(translations.requisites)}
            selected={option === '2'}
            value="2"
            onClick={setOption}
          />
          <Option
            name={intl.formatMessage(translations.settings)}
            selected={option === '3'}
            value="3"
            onClick={setOption}
          />
        </div>
      </div>
    </PageLayout>
  )
}
