import React from "react"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

import pkg from "../../../../package.json"

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
        v{pkg["version"]} - Data available via{" "}
        <Link href="https://github.com/infotorch/covid19-australia-api">
          API
        </Link>
      </Typography>
    </>
  </div>
)

export default ProjectIntro
