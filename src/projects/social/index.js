import React from "react"
import { Switch, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import TabNav from "./components/TabNavs"
import NotFoundContent from "../../components/NotFound"

import MembersRanked from "./containers/SocialMembersRanked"
import FollowingLookup from "./containers/SocialFollowingLookup"
import TopRanked from "./containers/SocialTopRanked"

import ProjectInfo from "./components/ProjectIntro"
import ProjectFooter from "./components/ProjectFooter"

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

      <div className={classes.nav}>
        <TabNav />
      </div>

      <main className={classes.content}>
        <Switch>
          <Route path="/social/lookup" exact>
            <FollowingLookup />
          </Route>
          <Route path="/social/top" exact>
            <TopRanked />
          </Route>
          <Route path="/social" exact>
            <MembersRanked />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </main>

      <ProjectFooter />
    </div>
  )
}

export default SocialApp
