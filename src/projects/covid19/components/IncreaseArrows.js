import React from "react"
import { IoMdArrowDropupCircle } from "react-icons/io"
import { IoMdArrowDropdownCircle } from "react-icons/io"

const getIncrease = (today, yesterday, showTotal = true) => {
  const d = today - yesterday

  if (d <= 0) {
    return <p />
  }
  return (
    <>
      {d > 0 ? (
        <IoMdArrowDropupCircle style={{ color: "firebrick" }} />
      ) : (
        <IoMdArrowDropdownCircle style={{ color: "forestgreen" }} />
      )}
      {showTotal ? " " + d : undefined}
    </>
  )
}

export default getIncrease
