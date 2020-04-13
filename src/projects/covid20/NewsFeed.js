import React, { useState, useEffect } from "react"
import { timeSince } from "../../utils"

import agent from "../../agent"
import { BoxTitle, Table, TableBody, TableCell, TableRow } from "../../ui"

const TopStatsTable = ({ ...rest }) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.covidAgent.newsFeed().then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>loading..</div>
  }

  const heading = "News feed from health authorities"

  return (
    <>
      <BoxTitle heading={heading} />

      <Table>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={"newsfeed__" + row.source + i}>
              <TableCell component="th" scope="row" align="left">
                {row.source.name}
              </TableCell>
              <TableCell align="left">
                <a href={row.link} alt="{row.title}">
                  {row.title.substr(0, 60)} {row.title.length > 60 ? ".." : ""}
                </a>
              </TableCell>
              <TableCell>{timeSince(Date.parse(row.created))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TopStatsTable
