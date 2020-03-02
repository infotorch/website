import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import DrawMaterial from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import DnsRoundedIcon from "@material-ui/icons/DnsRounded"
import PublicIcon from "@material-ui/icons/Public"

const categories = [
  {
    id: "Sports Grants",
    children: [
      { id: "Data", icon: <DnsRoundedIcon />, link: "/sportsgrants" },
      { id: "Map", icon: <PublicIcon />, link: "/sportsgrants/map" },
    ],
  },
  {
    id: "Climate Act Now",
    children: [{ id: "Data", icon: <DnsRoundedIcon />, link: "/climateact" }],
  },
]

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
})

const Drawer = ({ classes, closeDrawer, ...other }) => (
  <DrawMaterial variant="permanent" {...other}>
    <List disablePadding>
      <ListItem
        className={clsx(classes.firebase, classes.item, classes.itemCategory)}
      >
        Infotorch
      </ListItem>
      <ListItem className={clsx(classes.item, classes.itemCategory)}>
        <ListItemIcon className={classes.itemIcon}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary,
          }}
        >
          Projects
        </ListItemText>
      </ListItem>
      {categories.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, active, link }) => (
            <ListItem
              key={childId}
              button
              className={clsx(classes.item, active && classes.itemActiveItem)}
              {...{ to: link }}
              component={Link}
              onClick={closeDrawer}
            >
              <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                {childId}
              </ListItemText>
            </ListItem>
          ))}

          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </List>
  </DrawMaterial>
)

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Drawer)
