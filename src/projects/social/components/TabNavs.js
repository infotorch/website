import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import useTabsWithRouter from "../../../providers/useTabsWithRouter"
import TabLink from "../../../components/TabLink"

const style = makeStyles(theme => ({
  tabs: {
    // marginBottom: "30px",
  },
}))

const TabNav = () => {
  const tabValue = useTabsWithRouter(
    ["/social/lookup", "/social/top", "/social/tweets", "/social"],
    "/social",
  )

  const classes = style()

  return (
    <Paper square className={classes.tabs}>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        aria-label="tabs navigation"
      >
        <TabLink label="Members" value="/social" />
        <TabLink label="Top Followed" value="/social/top" />
        <TabLink label="Top Tweets" value="/social/tweets" />
        <TabLink label="Lookup" value="/social/lookup" />
      </Tabs>
    </Paper>
  )
}

export default TabNav
