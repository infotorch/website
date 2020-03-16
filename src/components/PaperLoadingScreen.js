import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = makeStyles(theme => ({
  container: {
    padding: "30px",
    marginBottom: "30px",
    mainHeight: "140px",
  },
  center: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
}))

const PaperLoadingScreen = () => {
  const classes = styles()

  return (
    <Paper className={classes.container}>
      <div className={classes.center}>
        <CircularProgress />
      </div>
    </Paper>
  )
}

export default PaperLoadingScreen
