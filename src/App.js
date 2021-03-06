import React, { useState, useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import { logPageView } from "./analyticsTracker"

import ErrorBoundary from "./components/ErrorBoundary"
import LaunchScreen from "./components/LaunchScreen"
import NotFoundContent from "./components/NotFound"
import Footer from "./components/Footer"

import SocialProjectApp from "./projects/social"
import SportsGrantsApp from "./projects/sportsgrants"
// import ClimateActApp from "./projects/climateact"
import CovidProject from "./projects/covid20/Dashboard"

import "./App.css"

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
    <div>
      {/* <CssBaseline /> */}
      <ErrorBoundary>
        {!ready && <LaunchScreen />}
        {ready && (
          <div className="it_container">
            <nav className="bg-blue-800 absolute top-0 left-0 w-full z-10 md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
              <div className=" mx-auto px-2 ">
                <div className="w-full items-left px-4">
                  {/* <img src={infoTorchLogo} height="50" alt="logo" /> */}
                  <a
                    className="text-white text-lg text-bold lowercase lg:inline-block font-semibold"
                    href="/social"
                  >
                    {/* <MdHighlight />  */}
                    Infotorch
                  </a>
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
            </nav>
            <main className="bg-gray-200 w-full h-auto">
              <Switch>
                <Route path="/social">
                  <SocialProjectApp />
                </Route>
                {/* <Route path="/climateact">
                  <ClimateActApp />
                </Route> */}
                <Route path="/sportsgrants">
                  <SportsGrantsApp />
                </Route>
                <Route path="/covid19">
                  <CovidProject />
                </Route>

                <Route>
                  <NotFoundContent />
                </Route>
              </Switch>
            </main>
            <footer className="footerFixed border-box bg-white">
              <Footer />
            </footer>
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default App
