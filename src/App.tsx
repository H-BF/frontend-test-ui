import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage, MainPageAPI, MainPageHbf, APILaunchPage, HBFLaunchPage, CompareAPILaunchPage } from 'pages'
import { BASEPREFIX } from 'constants/basePrefix'

export const App: FC = () => (
  <BrowserRouter basename={BASEPREFIX}>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/api">
        <MainPageAPI />
      </Route>
      <Route path="/api/:serviceId">
        <MainPageAPI />
      </Route>
      <Route exact path="/hbf">
        <MainPageHbf />
      </Route>
      <Route path="/api-launch/:serviceId/:launchId/:executionId?/:assertionId?">
        <APILaunchPage />
      </Route>
      <Route path="/hbf-launch/:id">
        <HBFLaunchPage />
      </Route>
      <Route path="/compare-api-launch/:serviceId/:launchFirstId/:launchSecondId">
        <CompareAPILaunchPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
