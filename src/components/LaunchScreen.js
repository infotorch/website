import React from "react"
import { AiOutlineReload as CircularProgress } from "react-icons/ai"

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
}

const LaunchScreen = () => (
  <div style={styles}>
    <CircularProgress />
  </div>
)

export default LaunchScreen
