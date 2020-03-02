import React, { useState } from "react"

import PropTypes from "prop-types"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import Box from "@material-ui/core/Box"
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import InfoIcon from "@material-ui/icons/Info"
import GitHubIcon from "@material-ui/icons/GitHub"

import { Link } from "react-router-dom"

const NavBar = ({
  onAboutClick,
  handleDrawerOpen,
  performingAction,
  navIconClassName,
}) => {
  const [menu, setMenu] = useState(null)

  const openMenu = e => setMenu(e.currentTarget)
  const closeMenu = () => setMenu(null)

  const menuItems = []

  return (
    <AppBar color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label={"open drawer"}
          onClick={handleDrawerOpen}
          className={navIconClassName}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" flexGrow={1}>
          <EmojiObjectsIcon style={{ marginTop: "0px" }} />
          <Typography color="inherit" variant="h6">
            Infotorch
          </Typography>
        </Box>
        <>
          <IconButton
            color="inherit"
            disabled={performingAction}
            onClick={openMenu}
          />
          <Tooltip title={"View source code on GitHub"} enterDelay={300}>
            <IconButton
              color="inherit"
              aria-label={"view source code on GitHub"}
              disabled={performingAction}
              target="_new"
              href="https://github.com/infotorch"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={"About this project"} enterDelay={300}>
            <IconButton
              color="inherit"
              aria-label={"show about project"}
              disabled={performingAction}
              onClick={() => {
                closeMenu()
                onAboutClick()
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Menu anchorEl={menu} open={Boolean(menu)} onClose={closeMenu}>
            {menuItems.map((menuItem, index) => {
              if (menuItem.hasOwnProperty("condition") && !menuItem.condition) {
                return null
              }

              let component = null

              if (menuItem.to) {
                component = (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={menuItem.to}
                    onClick={closeMenu}
                  >
                    {menuItem.name}
                  </MenuItem>
                )
              } else {
                component = (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      closeMenu()

                      menuItem.onClick()
                    }}
                  >
                    {menuItem.name}
                  </MenuItem>
                )
              }

              if (menuItem.divide) {
                return (
                  <span key={index}>
                    <Divider />

                    {component}
                  </span>
                )
              }

              return component
            })}
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  )
}

NavBar.defaultProps = {
  performingAction: false,
}

NavBar.propTypes = {
  performingAction: PropTypes.bool.isRequired,
  onAboutClick: PropTypes.func.isRequired,
}

export default NavBar
