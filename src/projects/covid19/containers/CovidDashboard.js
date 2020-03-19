import React, { useState, useEffect } from "react"
import numeral from "numeral"
import { parseISO, format } from "date-fns"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
import agent from "../../../agent"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { IoMdArrowDropupCircle } from "react-icons/io"
import { IoMdArrowDropdownCircle } from "react-icons/io"

const style = makeStyles(theme => ({
  container: {
    padding: "30px",
    marginBottom: "30px",
  },
  table: {
    // minWidth: 350,
    // maxWidth: 630,
  },
  // thead: {
  //   fontWeight: "bold",
  //   backgroundColor: "black",
  //   color: "white",
  // },
}))

const getIncrease = (today, yesterday) => {
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
      {" " + d}
    </>
  )
}

function TopStatsTable({ ...rest }) {
  const classes = style()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.covidAgent
      .statTotals()
      // .then(r => r.data)
      // .then(d =>
      //   d.map((record, index) => ({
      //     rank: index + 1,
      //     ...record,
      //   })),
      // )
      .then(data => {
        console.log(data)
        setRows(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <PaperLoadingScreen />
  }

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead}>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell colSpan="2">Cases</TableCell>
            <TableCell colSpan="2">Deaths</TableCell>
            <TableCell colSpan="2">Tested</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.state_long}>
              <TableCell component="th" scope="row">
                {row.state_long}
              </TableCell>
              <TableCell align="left">{row.confirmed} </TableCell>
              <TableCell>
                {getIncrease(row.confirmed, row.confirmed_yesterday)}{" "}
              </TableCell>
              <TableCell align="left">{row.deaths}</TableCell>
              <TableCell>
                {getIncrease(row.deaths, row.deaths_yesterday)}{" "}
              </TableCell>
              <TableCell align="left">
                {row.tested > 0 ? numeral(row.tested).format("0,0") : ""}
              </TableCell>
              <TableCell>
                {/* {getIncrease(row.tested, row.tested_yesterday)}{" "} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CovidDashboard = () => {
  return (
    <>
      <Paper xs={12} md={6}>
        <TopStatsTable />
      </Paper>
    </>
  )
}

export default CovidDashboard
