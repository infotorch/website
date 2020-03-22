import React, { useState, useEffect } from "react"
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
    agent.covidAgent.newsFeed().then(data => {
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
            <TableCell colspan="3">
              Latest News from Health Departments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.state_long}>
              <TableCell component="th" scope="row">
                {row.source.name}
              </TableCell>
              <TableCell align="left" size="">
                <a href="{row.link}" alt="{row.title}">
                  {row.title}
                </a>
              </TableCell>
              <TableCell align="" size="">
                {formatDistanceToNow(Date.parse(row.created))} ago
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StateForecast
