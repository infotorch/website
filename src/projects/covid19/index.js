import React, { useEffect } from "react"
import ReactGA from "react-ga"
import { Switch, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import NotFoundContent from "../../components/NotFound"
import CovidDashboard from "./containers/CovidDashboard"
import ProjectInfo from "./components/ProjectIntro"

const style = makeStyles(theme => ({
  app: {
    gridColumn: "1",
    gridRow: "2",
  },
  nav: {
    padding: "30px 30px 0px 30px",
  },
  content: {
    padding: "30px",
  },
}))

const SocialApp = () => {
  const classes = style()

  useEffect(() => {
    const page = window.location.pathname
    ReactGA.set({ page: page })
    ReactGA.pageview(page)
  }, [])

  return (
    <div className={classes.app}>
      <ProjectInfo />

      <main className={classes.content}>
        <Switch>
          <Route path="/covid19/" exact>
            <CovidDashboard />
          </Route>
          <Route path="/covid19/resources" exact>
            {/* <TopRanked /> */}
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default SocialApp
