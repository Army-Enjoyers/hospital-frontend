import { Box } from '@chakra-ui/react'
import cx from 'classnames'
import React from 'react'
import { useIntl } from 'react-intl'

import { Container } from '~/layouts/Container'

import translations from './Footer.i18n.json'
import styles from './Footer.module.scss'
import { images } from './assets'

export const Footer: React.FC = () => {
  const intl = useIntl()
  return (
    <Box background="#268529" py="30px">
      <Container>
        <div className={cx(styles.columns)}>
          <div className={cx(styles.column)}>
            <div className={cx(styles.header)}>
              <h3>{intl.formatMessage(translations.workingHours)}</h3>
            </div>
            <div className={cx(styles.content)}>
              <img src={images.hours} />
              <div className={cx(styles.details)}>
                <p>
                  {intl.formatMessage(translations.office)}
                  <br />
                  {intl.formatMessage(translations.officeHours)}
                </p>
                <p>
                  {intl.formatMessage(translations.warehouse)}
                  <br />
                  {intl.formatMessage(translations.warehouseHours)}
                </p>
              </div>
            </div>
          </div>
          <div className={cx(styles.column)}>
            <div className={cx(styles.header)}>
              <h3>{intl.formatMessage(translations.additionally)}</h3>
            </div>
            <div className={cx(styles.content)}>
              <img src={images.requisites} />
              <div className={cx(styles.details)}>
                <a href="https://telegra.ph/Rekvizity-01-10">
                  {intl.formatMessage(translations.requisites)}
                </a>
                <a href="https://telegra.ph/Polzovatelskoe-soglashenie-01-10">
                  {intl.formatMessage(translations.termsOfUse)}
                </a>
                <a href="https://telegra.ph/Politika-v-otnoshenii-obrabotki-personalnyh-dannyh-01-03">
                  {intl.formatMessage(translations.privacyPolicy)}
                </a>
              </div>
            </div>
          </div>
          <div className={cx(styles.column)}>
            <div className={cx(styles.header)}>
              <h3>{intl.formatMessage(translations.contacts)}</h3>
            </div>
            <div className={cx(styles.content)}>
              <img src={images.email} />
              <div className={cx(styles.details)}>
                <a className={cx(styles.email)} href="#">
                  lavkadostavkaminsk@gmail.com
                </a>
              </div>
            </div>
            <div className={cx(styles.content)}>
              <img src={images.telephone} />
              <div className={cx(styles.details)}>
                <a href="tel:+375445689590">+375 (25) 977 36 34</a>
              </div>
            </div>
            <div className={cx(styles.icons)}>
              <a
                className={cx(styles.link)}
                href="https://instagram.com/dlavka_by?igshid=k6qae4w4syms"
              >
                <img alt="instagram" src={images.instagram} />
              </a>
              <a className={cx(styles.link)} href="https://vk.com/club201752169">
                <img alt="vk" src={images.vk} />
              </a>
              <a
                className={cx(styles.link)}
                href="https://m.facebook.com/Lavka-Dostavka-104841648215792/"
              >
                <img alt="facebook" src={images.facebook} />
              </a>
            </div>
          </div>
        </div>
        <div className={cx(styles.copyright)}>
          <p>{intl.formatMessage(translations.stateRegistrationCertificate)}</p>
          <p>{intl.formatMessage(translations.copyright)}</p>
        </div>
      </Container>
    </Box>
  )
}
