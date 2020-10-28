import React from "react"
import { Switch, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import "./index.css"

import NotFoundContent from "../../components/NotFound"

import SportsGrantsTable from "./containers/SportsGrantsTable"
import SportsGrantsFigures from "./containers/SportsGrantsFigures"
import SportsGrantsMap from "./containers/SportsGrantsMap"

const style = makeStyles(theme => ({
  nav: {
    padding: "30px 30px 0px 30px",
    gridColumn: "1",
    gridRow: "2",
  },
  content: {
    // gridColumn: "1",
    gridRow: "2/3",
    position: "relative",
    // padding: "0px 30px 30px 30px",
    // [theme.breakpoints.down("xs")]: {
    //   gridColumn: "1/3",
    // },
  },
}))

const SportsGrantsApp = () => {
  const classes = style()

  return (
    <>
      <Switch>
        <Route path="/sportsgrants" exact>
          <SportsGrantsTable />
        </Route>
        <Route path="/sportsgrants/figures" exact>
          <SportsGrantsFigures />
        </Route>
        <Route path="/sportsgrants/map" exact>
          <div className="map_box_container">
            <SportsGrantsMap className="map" />
          </div>
        </Route>
        <Route>
          <NotFoundContent />
        </Route>
      </Switch>
    </>
  )
}

export default SportsGrantsApp
