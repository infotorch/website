import React from "react"
import { FaArrowDown } from "react-icons/fa"
import { FaArrowUp } from "react-icons/fa"

export const TrendIcon = ({ current, previous }) => {
  const d = current - previous

  if (d <= 0) {
    return <p />
  }
  return (
    <>
      {d > 0 ? (
        <FaArrowUp style={{ color: "firebrick" }} />
      ) : (
        <FaArrowDown style={{ color: "forestgreen" }} />
      )}
      {/* {" " + d} */}
    </>
  )
}
