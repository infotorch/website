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
      <Typography variant="body2" gutterBottom>
        Concept by{" "}
        <Link href="https://twitter.com/simonahac">Simon Holmes à Court</Link>.
        2020.
      </Typography>
    </>
  </div>
)

export default ProjectIntro
