import React, { useState, useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import { logPageView } from "./analyticsTracker"

import ErrorBoundary from "./components/ErrorBoundary"
import LaunchScreen from "./components/LaunchScreen"
import NotFoundContent from "./components/NotFound"

// import SocialProjectApp from "./projects/social"
// import SportsGrantsApp from "./projects/sportsgrants"
// import ClimateActApp from "./projects/climateact"
import CovidProject from "./projects/covid20"

import infoTorchLogo from "./images/infotorch-logo.png"
const styles = {
  root: {
    display: "grid",
    gridTemplateRows: "80px auto",
    height: "100vh",
    alignItems: "start",
  },
  appBar: {
    gridColumn: "1",
    gridRow: "1",
    backgroundColor: "#006db3",
    borderBottom: `2px solid #006db3`,
    color: "white",
  },
}

const App = () => {
  const [state] = useState({
    ready: true,
  })
  const history = useHistory()
  const { ready } = state

  useEffect(() => {
    logPageView(history)
  }, [history])

  return (
    <div styles={styles.root}>
      {/* <CssBaseline /> */}

      <ErrorBoundary>
        {!ready && <LaunchScreen />}
        {ready && (
          <>
            <div style={styles.appBar}>
              <div>
                <div display="flex" flexGrow={1}>
                  <img src={infoTorchLogo} height="50" alt="logo" />
                </div>

                {/* <IconButton
                  color="inherit"
                  aria-label={"Follow us on twitter"}
                  // disabled={performingAction}
                  target="_new"
                  href="https://github.com/infotorch"
                >
                  <GitHubIcon />
                </IconButton>

                <Tooltip title={"View source code on GitHub"} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    aria-label={"view source code on GitHub"}
                    // disabled={performingAction}
                    target="_new"
                    href="https://twitter.com/infotorchorg"
                  >
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={"Email us"} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    aria-label={"email us"}
                    href="mailto:hello@infotorch.org"
                    // disabled={performingAction}
                    // onClick={() => {
                    //   closeMenu()
                    //   onAboutClick()
                    // }}
                  >
                    <EmailIcon />
                  </IconButton> */}
                {/* </div> */}
              </div>
            </div>

            <Switch>
              {/* <Route path="/social">
                <SocialProjectApp />
              </Route>
              <Route path="/climateact">
                <ClimateActApp />
              </Route>
              <Route path="/sportsgrants">
                <SportsGrantsApp />
              </Route> */}
              <Route path="/covid19">
                <CovidProject />
              </Route>

              <Route>
                <NotFoundContent />
              </Route>
            </Switch>
          </>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default App
