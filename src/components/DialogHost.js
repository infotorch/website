import React, { Component } from "react"
import PropTypes from "prop-types"
import AboutDialog from "./AboutDialog"

class DialogHost extends Component {
  render() {
    const { performingAction, theme, dialogs } = this.props

    const { openSnackbar } = this.props

    const aboutDialog = dialogs.aboutDialog

    return (
      <>
        <AboutDialog
          dialogProps={aboutDialog.dialogProps}
          performingAction={performingAction}
          theme={theme}
          openSnackbar={openSnackbar}
          {...aboutDialog.props}
        />
      </>
    )
  }
}

DialogHost.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  dialogs: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
}

export default DialogHost
