import React from "react"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import pkg from "../../../../package.json"

console.log(pkg)

const styles = {
  // width: "100%",
  margin: "15px 30px 0px 30px",
  padding: "0 45px 25px 45px",
  textAlign: "center",
}

const ProjectIntro = () => (
  <div style={styles}>
    <>
      <Typography variant="caption" gutterBottom>
        v{pkg["version"]} - {process.env.BRANCH_NAME} - {process.env.REVISION}
      </Typography>
    </>
  </div>
)

export default ProjectIntro
