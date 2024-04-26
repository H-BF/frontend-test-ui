import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  MainPage,
  MainPageAPI,
  MainPageHbf,
  APILaunchPage,
  HBFLaunchPage,
  CompareAPILaunchPage,
  BarracudaLaunchsPage,
  BarracudaTestInfoPage,
  BarracudaTestResultPage,
  BarracudaDiffResultPage,
} from 'pages'
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
      <Route exact path="/barracuda">
        <BarracudaLaunchsPage />
      </Route>
      <Route exact path="/barracuda/search/:launchId?">
        <BarracudaLaunchsPage />
      </Route>
      <Route exact path="/barracuda/test-info/:launchUuid">
        <BarracudaTestInfoPage />
      </Route>
      <Route exact path="/barracuda/test-result/:launchUuid/:testInfoUuid">
        <BarracudaTestResultPage />
      </Route>
      <Route exact path="/barracuda/diff-result/:launchUuid/:testInfoUuid/:testResultUuid">
        <BarracudaDiffResultPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
