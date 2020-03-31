import React, { useState, useEffect } from "react"
import { timeSince } from "../../utils"

import agent from "../../agent"
import {
  BoxTitle,
  TrendIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../ui"

const TopStatsTable = ({ ...rest }) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.covidAgent
      .statTotals()
      .then(d => d.filter(a => a.state !== "AU"))
      .then(data => {
        setRows(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>loading..</div>
  }

  const heading = "Statistics for each Australian State"

  return (
    <>
      <BoxTitle heading={heading} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className="hidden phone:hidden whitespace-no-wrap font-semibold text-left">
              State
            </TableHeaderCell>
            <TableHeaderCell className="block phone:block whitespace-no-wrap font-semibold text-left">
              State
            </TableHeaderCell>
            <TableHeaderCell
              colSpan="2"
              className="whitespace-no-wrap pl-6 text-left"
            >
              Cases
            </TableHeaderCell>
            <TableHeaderCell
              colSpan="2"
              className="whitespace-no-wrap pl-6 text-left"
            >
              Deaths
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-no-wrap pl-6 text-left">
              Updated
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.state_long}>
              <TableCell
                component="th"
                className="block phone:hidden whitespace-no-wrap pl-6 font-semibold text-left"
              >
                {row.state_long}
              </TableCell>
              <TableCell
                component="th"
                className="hidden phone:block whitespace-no-wrap font-semibold text-left"
              >
                {row.state}
              </TableCell>
              <TableCell className="whitespace-no-wrap pl-6 text-left">
                {row.confirmed}{" "}
              </TableCell>
              <TableCell className="whitespace-no-wrap pl-6 text-left">
                <TrendIcon
                  current={row.confirmed}
                  previous={row.confirmed_yesterday}
                />
              </TableCell>
              <TableCell>{row.deaths}</TableCell>
              <TableCell>
                <TrendIcon
                  current={row.deaths}
                  previous={row.deaths_yesterday}
                />
              </TableCell>
              <TableCell>{timeSince(Date.parse(row.date_created))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TopStatsTable
