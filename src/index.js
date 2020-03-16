import React from "react"
import ReactDOM from "react-dom"
import * as Sentry from "@sentry/browser"
import { BrowserRouter } from "react-router-dom"

import { initializeGA } from "./analyticsTracker"

import "./index.css"
import App from "./App"

initializeGA()

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ["production", "stage", "staging"].indexOf(process.env.NODE_ENV) !== -1)(),
})

const Core = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <App />
  </BrowserRouter>
)
ReactDOM.render(<Core />, document.getElementById("root"))
