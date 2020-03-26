import React, { Component } from "react"
import { MdFindInPage as FindIcon } from "react-icons/md"
import EmptyState from "./EmptyState"

const NotFoundContent = () => (
  <EmptyState
    icon={<FindIcon />}
    title="Content not found"
    description="The requested URL was not found on this server"
  />
)

export default NotFoundContent
