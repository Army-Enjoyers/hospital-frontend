import { Flex, Image, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { object, string } from 'yup'

import { createClient } from '~/api'
import { Button, Input } from '~/components'
import { Container, TileLayout } from '~/layouts'
import { useForm } from '~/lib/hooks'
import { useStatusModal } from '~/providers'

import translations from './Login.i18n.json'
import styles from './Login.module.scss'
import { images } from './assets'
import { LoginState } from './types'

interface Props {
  initialValues: LoginState
}

const getSchema = () =>
  object({
    email: string().required().email(),
    password: string().required(),
  }).required()

export const Login: React.FC<Props> = ({ initialValues = { email: '', password: '' } }) => {
  const intl = useIntl()

  const { triggerStatus, closeModal } = useStatusModal()

  const onSubmit = async (values: LoginState) => {
    const client = createClient()
    const { ok } = await client.auth(values)
    if (ok) {
      window.location.href = '/'
    } else {
      triggerStatus({
        title: intl.formatMessage(translations.authErrorTitle),
        description: intl.formatMessage(translations.authErrorDescription),
        onSubmit: closeModal,
      })
    }
  }

  const { field, submitProps } = useForm({
    initialValues: initialValues,
    validationSchema: getSchema(),
    onSubmit: onSubmit,
  })
  return (
    <Container height="100vh">
      <Flex alignItems="center" height="100%" justifyContent="center">
        <Box width="40%">
          <Link to="/products">
            <Image src={images.logo} />
          </Link>
        </Box>
        <TileLayout className={styles.form}>
          <div>
            <p className={styles.title}>{intl.formatMessage(translations.title)}</p>
            <p className={styles.subTitle}>
              {intl.formatMessage(translations.subTitle, {
                register: (
                  <Link className={styles.link} to="/register">
                    Регистрация
                  </Link>
                ),
              })}
            </p>
          </div>
          <Input
            className={styles.field}
            label={intl.formatMessage(translations.email)}
            {...field('email')}
          />
          <Input
            isPassword
            className={styles.field}
            label={intl.formatMessage(translations.password)}
            {...field('password')}
          />
          <div className={styles.buttons}>
            <Button color="green" {...submitProps}>
              {intl.formatMessage(translations.next)}
            </Button>
          </div>
        </TileLayout>
      </Flex>
    </Container>
  )
}
