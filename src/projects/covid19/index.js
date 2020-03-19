import React from "react"
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
    // gridColumn: "1",
    // gridRow: "2",
  },
  content: {
    // gridColumn: "1",
    // gridRow: "3",
    padding: "30px",
    // alignSelf: "stretch",
    // justifySelf: "stretch",
    // [theme.breakpoints.down("xs")]: {
    //   gridColumn: "1/3",
    // },
  },
}))

const SocialApp = () => {
  const classes = style()

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
