import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Catalog, Register, Login, Profile, Cart, History } from '~/modules'
import { Providers } from '~/providers/Providers'

import './styles/index.css'

ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <Switch>
        <Route component={Register} path="/register" />
        <Route component={Login} path="/login" />
        <Route component={Profile} path="/profile" />
        <Route component={Cart} path="/cart" />
        <Route component={History} path="/history" />
        <Route component={Catalog} path="/products" />
        <Redirect to="/products" />
      </Switch>
    </BrowserRouter>
  </Providers>,
  document.getElementById('root'),
)
