import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'

import { createClient } from '~/api'
import { OrderProps, OrderStatus } from '~/api/order/response'
import { Option } from '~/components'
import { PageLayout } from '~/layouts'
import { getToken } from '~/lib/helpers'
import { useSearch } from '~/providers'

import translations from './History.i18n.json'
import styles from './History.module.scss'
import { Order } from './components'
import { images } from './images'
import { Bookmark } from './types'

export const History: React.FC = () => {
  const intl = useIntl()
  const [loadingToken, setLoadingToken] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const handler = async () => {
      setToken(await getToken())
      setLoadingToken(true)
    }
    void handler()
  }, [setToken, setLoadingToken])
  const [selected, setSelected] = useState<Bookmark>(Bookmark.all)
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [viewOrders, setViewOrders] = useState<OrderProps[]>([])
  const [loading, setLoading] = useState(false)

  const { search } = useSearch()

  const findOrders = useCallback(
    debounce(async (search) => {
      const client = createClient()
      if (search !== '') setOrders(await client.findOrders(search))
      else setOrders(await client.findOrders())
      setLoading(true)
    }, 300),
    [selected],
  )

  useEffect(() => {
    void findOrders(search)
  }, [selected, search, findOrders])

  useEffect(() => {
    if (selected === Bookmark.all) setViewOrders(orders)
    if (selected === Bookmark.completed)
      setViewOrders(orders.filter((order) => order.status === OrderStatus.arrived))
    if (selected === Bookmark.waiting)
      setViewOrders(orders.filter((order) => order.status === OrderStatus.inProgress))
  }, [selected, orders, setViewOrders])

  return (
    <>
      {!token && loadingToken && <Redirect to="/login" />}
      <PageLayout>
        <div className={styles.history}>
          <div className={styles.orders}>
            {!(!viewOrders.length && loading) && (
              <p className={styles.title}>{intl.formatMessage(translations.title)}</p>
            )}
            {viewOrders.map((order, index) => (
              <Order {...order} key={`order${String(index)}`} />
            ))}
            {!viewOrders.length && loading && (
              <div className={styles.ordersEmpty}>
                <img className={styles.ordersEmptyImage} src={images.empty} />
                <p>{intl.formatMessage(translations.empty)}</p>
              </div>
            )}
          </div>

          <div className={styles.options}>
            <Option
              first
              name={intl.formatMessage(translations.allOrders)}
              selected={selected === Bookmark.all}
              style="white"
              value={Bookmark.all}
              onClick={setSelected}
            />
            <Option
              name={intl.formatMessage(translations.waiting)}
              selected={selected === Bookmark.waiting}
              style="white"
              value={Bookmark.waiting}
              onClick={setSelected}
            />
            <Option
              name={intl.formatMessage(translations.completed)}
              selected={selected === Bookmark.completed}
              style="white"
              value={Bookmark.completed}
              onClick={setSelected}
            />
          </div>
        </div>
      </PageLayout>
    </>
  )
}
