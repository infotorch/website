import React from "react"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

const styles = {
  // width: "100%",
  margin: "15px 30px 0px 30px",
  padding: "0 45px 25px 45px",
  textAlign: "center",
}

const ProjectIntro = () => (
  <div style={styles}>
    <>
      <Typography variant="h5" gutterBottom>
        Australia COVID-19 Dashboard
      </Typography>
      <Typography variant="body2" gutterBottom>
        This is a project that tracks the latest Australian statistics for the
        COVID-19 outbreak by aggregating data directly from the states.
      </Typography>
    </>
  </div>
)

export default ProjectIntro
