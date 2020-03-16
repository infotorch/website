import React from "react"
import { Tab } from "@material-ui/core"
import RouterLink from "./RouterLink"

const TabLink = ({ to, value, ...props }) => {
  return (
    <Tab component={RouterLink} to={to ?? value} value={value} {...props} />
  )
}

export default TabLink
