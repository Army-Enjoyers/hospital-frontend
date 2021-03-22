import { Image } from '@chakra-ui/react'
import cx from 'classnames'
import React, { HTMLProps, ReactNode, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import { Input } from '~/components'
import { Container } from '~/layouts/Container'
import { getToken, logout } from '~/lib/helpers'
import { useSearch, useShoppingCart } from '~/providers'

import translations from './Header.i18n.json'
import styles from './Header.module.scss'
import { images } from './assets'
import { Icon, Balance } from './components'

interface ToggleProps {
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {}
}

const ProfileDropdown = React.forwardRef(
  ({ children, onClick }: ToggleProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        className={cx(styles.control)}
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
          onClick?.(e)
        }}
      >
        <Icon image={images.user} />
        {children}
      </div>
    )
  },
)

export const Header: React.FC<HTMLProps<HTMLDivElement>> = ({ ...props }) => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const { products } = useShoppingCart()
  useEffect(() => {
    const handler = async () => {
      setToken(await getToken())
      setLoading(true)
    }
    void handler()
  }, [setToken, setLoading])
  const { setSearch, search } = useSearch()
  return (
    <div className={cx(styles.header)} {...props}>
      <Container alignItems="center" display="flex" justifyContent="space-between" width="100%">
        <Link to="/">
          <Image src={images.logo} />
        </Link>
        <Input
          name="search"
          placeholder={intl.formatMessage(translations.search)}
          value={search}
          onChange={(value) => {
            setSearch(value ?? '')
          }}
        />
        <div className={cx(styles.controls)}>
          {token && loading && <Balance className={styles.control} />}
          <div className={cx(styles.control)}>
            <Link to="/cart">
              <Icon
                image={images.cart}
                notifications={products.length ? products.length : undefined}
              />
            </Link>
          </div>
          {token && loading ? (
            <Dropdown>
              <Dropdown.Toggle as={ProfileDropdown} />
              <Dropdown.Menu className={styles.dropdown}>
                <Dropdown.Item as={Link} className={styles.dropdownItem} eventKey="1" to="/profile">
                  {intl.formatMessage(translations.profile)}
                </Dropdown.Item>
                <Dropdown.Item as={Link} className={styles.dropdownItem} eventKey="2" to="/history">
                  {intl.formatMessage(translations.orders)}
                </Dropdown.Item>
                <Dropdown.Item className={styles.dropdownItem} eventKey="3" onClick={logout}>
                  {intl.formatMessage(translations.logout)}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Icon image={images.user} />
            </Link>
          )}
        </div>
      </Container>
    </div>
  )
}
