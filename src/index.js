import React from "react"
import ReactDOM from "react-dom"
import "typeface-roboto"
import "./index.css"
import * as Sentry from "@sentry/browser"
import App from "./App"

if (process.env.REACT_APP_SENTRY_DNS) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
  })
}

ReactDOM.render(<App />, document.getElementById("root"))
