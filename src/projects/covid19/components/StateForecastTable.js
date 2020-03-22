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
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import getIncrease from "./IncreaseArrows"

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
    height: "600px",
    width: "100%",
    // padding: "10px",
  },
  chartHeading: {
    marginTop: "15px",
    marginLeft: "15px",
  },
  // thead: {
  //   fontWeight: "bold",
  //   backgroundColor: "black",
  //   color: "white",
  // },
}))

function StateForecast({ ...rest }) {
  const classes = style()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.covidAgent.forecastStates().then(data => {
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
            <TableCell colSpan="1">R</TableCell>
            <TableCell colSpan="1">Doubles in</TableCell>
            <TableCell colSpan="1">3 Day Forecast</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.state_long}>
              <TableCell component="th" scope="row">
                {row.state_long}
              </TableCell>
              <TableCell align="left" size="">
                {row.r}{" "}
                {getIncrease(row.r, row.confirmed_2 / row.confirmed_3, false)}{" "}
              </TableCell>
              <TableCell align="" size="">
                {numeral(row.doubles_days).format("0.0")} days
              </TableCell>
              <TableCell align="">
                {numeral(row.forecast3).format("0,0")}
                {" cases"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StateForecast
