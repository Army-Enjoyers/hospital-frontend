import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Home, Login } from '~/modules'
import { Providers } from '~/providers/Providers'

import './styles/index.css'

ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  </Providers>,
  document.getElementById('root'),
)
