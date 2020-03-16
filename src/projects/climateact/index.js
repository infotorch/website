import React from "react"
import { Switch, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import NotFoundContent from "../../components/NotFound"

import ClimateActTable from "./Data"

const style = makeStyles(theme => ({
  nav: {
    padding: "30px 30px 0px 30px",
    gridColumn: "1",
    gridRow: "2",
  },
  content: {
    gridColumn: "1",
    gridRow: "3",
    padding: "0px 30px 30px 30px",
    // [theme.breakpoints.down("xs")]: {
    //   gridColumn: "1/3",
    // },
  },
}))

const ClimateActApp = () => {
  const classes = style()

  return (
    <>
      <main className={classes.content}>
        <Switch>
          <Route path="/climateact" exact>
            <ClimateActTable />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default ClimateActApp
