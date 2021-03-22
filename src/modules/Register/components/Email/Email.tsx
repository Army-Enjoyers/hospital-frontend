import { Image, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { object, string } from 'yup'

import { Button, Input } from '~/components'
import { Container, TileLayout } from '~/layouts'
import { useForm } from '~/lib/hooks'
import { EmailState } from '~/modules/Register/types'

import translations from './Email.i18n.json'
import styles from './Email.module.scss'
import { images } from './assets'

interface Props {
  onSubmit: (values: EmailState) => void
  initialValues: EmailState
}

const getSchema = () =>
  object({
    email: string().required().email(),
  }).required()

export const Email: React.FC<Props> = ({ onSubmit, initialValues }) => {
  const intl = useIntl()
  const { field, submitProps } = useForm({
    initialValues: initialValues,
    validationSchema: getSchema(),
    onSubmit: onSubmit,
  })
  return (
    <Container height="100vh">
      <Flex alignItems="center" height="100%" justifyContent="center">
        <Box width="50%">
          <Link to="/products">
            <Image src={images.logo} />
          </Link>
        </Box>
        <TileLayout className={styles.form}>
          <div>
            <p className={styles.title}>{intl.formatMessage(translations.title)}</p>
            <p className={styles.subTitle}>
              {intl.formatMessage(translations.subTitle, {
                login: (
                  <Link className={styles.link} to="/login">
                    Войти
                  </Link>
                ),
              })}
            </p>
          </div>
          <p className={styles.description}>{intl.formatMessage(translations.description)}</p>
          <Input
            className={styles.email}
            label={intl.formatMessage(translations.email)}
            {...field('email')}
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
