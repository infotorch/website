import React, { useState } from "react"
import readingTime from "reading-time"
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Snackbar from "@material-ui/core/Snackbar"
import Hidden from "@material-ui/core/Hidden"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import userTheme from "./theme"

import Drawer from "./components/Drawer"
import ErrorBoundary from "./components/ErrorBoundary"
import LaunchScreen from "./components/LaunchScreen"
import NavBar from "./components/NavBar"
import DialogHost from "./components/DialogHost"
import NotFoundContent from "./components/NotFound"

import HomeContent from "./HomePage"
import Map from "./projects/sportsgrants/Map"

const drawerWidth = 256

const style = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "56px auto",
    gridTemplateColumns: `${drawerWidth}px auto`,
    height: "100vh",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    gridColumn: "1/2",
    gridRow: "1",
  },
  drawer: {
    // width: drawerWidth,
    gridColumn: "1",
    gridRow: "2",
    [theme.breakpoints.up("lg")]: {
      flexShrink: 0,
      // width: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    // flexGrow: 1,
    gridColumn: "2",
    gridRow: "2",
    [theme.breakpoints.down("xs")]: {
      // flexShrink: 0,
      gridColumn: "1/3",

      // width: drawerWidth,
    },
    // padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

const App = () => {
  const [state, setState] = useState({
    ready: true,
    performingAction: false,
    theme: userTheme,
    user: null,
    userData: null,
    roles: [],

    snackbar: {
      autoHideDuration: 0,
      message: "",
      open: false,
    },
  })

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerOpen = () => {
    setMobileOpen(true)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [aboutOpen, setAboutOpen] = useState(false)

  const openSnackbar = (message, autoHideDuration = 2, callback) => {
    setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
        },
        ...state,
      },
      () => {
        if (callback && typeof callback === "function") {
          callback()
        }
      },
    )
  }

  const closeSnackbar = (clearMessage = false) => {
    const { snackbar } = state

    setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false,
      },
      ...state,
    })
  }

  const classes = style()

  const { ready, performingAction, theme, snackbar } = state

  return (
    <MuiThemeProvider theme={userTheme}>
      <div className={classes.root}>
        <CssBaseline />

        <ErrorBoundary>
          {!ready && <LaunchScreen />}

          {ready && (
            <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
              <NavBar
                className={classes.appBar}
                performingAction={performingAction}
                theme={theme}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                onAboutClick={() => setAboutOpen(true)}
              />
              <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                  <Drawer
                    PaperProps={{ style: { width: drawerWidth } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    closeDrawer={handleDrawerClose}
                  />
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    PaperProps={{ style: { width: drawerWidth } }}
                    closeDrawer={handleDrawerClose}
                  />
                </Hidden>
              </nav>

              <main className={classes.content}>
                <Switch>
                  <Route path="/" exact>
                    <HomeContent openSnackbar={openSnackbar} />
                  </Route>

                  <Route path="/sportsgrants/map" exact>
                    <Map openSnackbar={openSnackbar} />
                  </Route>

                  <Route>
                    <NotFoundContent />
                  </Route>
                </Switch>
              </main>
            </BrowserRouter>
          )}

          <>
            <DialogHost
              performingAction={performingAction}
              theme={theme}
              openSnackbar={openSnackbar}
              dialogs={{
                aboutDialog: {
                  dialogProps: {
                    open: aboutOpen,

                    onClose: () => setAboutOpen(false),
                  },
                },
              }}
            />

            <Snackbar
              autoHideDuration={snackbar.autoHideDuration}
              message={snackbar.message}
              open={snackbar.open}
              onClose={closeSnackbar}
            />
          </>
        </ErrorBoundary>
      </div>
    </MuiThemeProvider>
  )
}

export default App
