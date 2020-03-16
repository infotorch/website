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
      <Typography variant="h3" gutterBottom>
        Australian Parliament Social Index
      </Typography>
      <Typography variant="body2" gutterBottom>
        This is a project that tracks the twitter account of the member of the{" "}
        <Link href="https://aph.gov.au">Australian Federal Parliament</Link>.
        Currently there are <em>189</em> members of the House and Senate with a
        Twitter account, from a total of <em>226</em> (150 House and 76 Senate).{" "}
        <em>84%</em> of Australian Federal Parliamentarians are on Twitter.
      </Typography>
    </>
  </div>
)

export default ProjectIntro
