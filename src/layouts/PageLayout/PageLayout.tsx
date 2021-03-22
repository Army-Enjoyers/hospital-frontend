import React from 'react'

import { Container } from '~/layouts/Container'

import { Header, Footer } from './components'

interface Props {
  footerOff?: boolean
  headerOff?: boolean
}

export const PageLayout: React.FC<Props> = ({ children, headerOff, footerOff }) => {
  return (
    <>
      {!headerOff && <Header />}
      <Container>{children}</Container>
      {!footerOff && <Footer />}
    </>
  )
}
