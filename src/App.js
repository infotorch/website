import React, { useState, useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles"

import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
// import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Tooltip from "@material-ui/core/Tooltip"
// import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects"
// import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
// import Divider from "@material-ui/core/Divider"
// import Menu from "@material-ui/core/Menu"
// import MenuItem from "@material-ui/core/MenuItem"

// import InfoIcon from "@material-ui/icons/Info"
import GitHubIcon from "@material-ui/icons/GitHub"
import TwitterIcon from "@material-ui/icons/Twitter"
import EmailIcon from "@material-ui/icons/Email"

import { logPageView } from "./analyticsTracker"
import userTheme from "./theme"
import ErrorBoundary from "./components/ErrorBoundary"
import LaunchScreen from "./components/LaunchScreen"
import NotFoundContent from "./components/NotFound"
import SocialProjectApp from "./projects/social"
import SportsGrantsApp from "./projects/sportsgrants"
import ClimateActApp from "./projects/climateact"
import CovidProject from "./projects/covid19"

import infoTorchLogo from "./images/infotorch-logo.png"
const style = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "80px auto",
    height: "100vh",
    alignItems: "start",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    gridColumn: "1",
    gridRow: "1",
    backgroundColor: theme.dark,
    borderBottom: `2px solid ${theme.primary}`,
    color: "white",
  },
}))

const App = () => {
  const [state] = useState({
    ready: true,
  })
  const history = useHistory()
  const classes = style()
  const { ready } = state

  useEffect(() => {
    logPageView(history)
  }, [history])

  return (
    <MuiThemeProvider theme={userTheme}>
      <div className={classes.root}>
        <CssBaseline />

        <ErrorBoundary>
          {!ready && <LaunchScreen />}
          {ready && (
            <>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <Box display="flex" flexGrow={1}>
                    <img src={infoTorchLogo} height="50" alt="logo" />
                  </Box>

                  <IconButton
                    color="inherit"
                    aria-label={"Follow us on twitter"}
                    // disabled={performingAction}
                    target="_new"
                    href="https://github.com/infotorch"
                  >
                    <GitHubIcon />
                  </IconButton>

                  <Tooltip
                    title={"View source code on GitHub"}
                    enterDelay={300}
                  >
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
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>

              <Switch>
                <Route path="/social">
                  <SocialProjectApp />
                </Route>
                <Route path="/climateact">
                  <ClimateActApp />
                </Route>
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
            </>
          )}
        </ErrorBoundary>
      </div>
    </MuiThemeProvider>
  )
}

export default App
