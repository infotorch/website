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
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { IoMdArrowDropupCircle } from "react-icons/io"
import { IoMdArrowDropdownCircle } from "react-icons/io"

import CovidChart from "../components/CovidChart"

const style = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: "30px",
    marginBottom: "30px",
  },
  table: {
    // minWidth: 350,
    // maxWidth: 630,
  },
  chart: {
    // minHeight: "500px",
    // paddingTop: "10px",
    // paddingLeft: "10px",
    height: "560px",
    // padding: "10px",
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead}>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell colSpan="2">Cases</TableCell>
            <TableCell colSpan="2">Deaths</TableCell>
            <TableCell colSpan="1">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.state_long}>
              <TableCell component="th" scope="row">
                {row.state_long}
              </TableCell>
              <TableCell align="left" size="small">
                {row.confirmed}{" "}
              </TableCell>
              <TableCell align="left">
                {getIncrease(row.confirmed, row.confirmed_yesterday)}{" "}
              </TableCell>
              <TableCell align="left" size="small">
                {row.deaths}
              </TableCell>
              <TableCell align="left">
                {getIncrease(row.deaths, row.deaths_yesterday)}{" "}
              </TableCell>
              <TableCell align="left">
                {formatDistanceToNow(Date.parse(row.date_created))} ago
                {/* {row.tested > 0 ? numeral(row.tested).format("0,0") : ""} */}
              </TableCell>
              {/* <TableCell>
                {distanceInWordsToNow(row.date_created)}
                {/* {getIncrease(row.tested, row.tested_yesterday)}{" "}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CovidDashboard = () => {
  const classes = style()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <TopStatsTable />
        </Grid>
        <Grid item xs>
          <Paper className={classes.chart}>
            {/* <Typography variant="h5">Cases over time for each state</Typography> */}
            <CovidChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default CovidDashboard
