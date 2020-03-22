import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
import agent from "../../../agent"
import Link from "@material-ui/core/Link"
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
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true)
    }, 1000 * 60 * 5)
  })

  useEffect(() => {
    setRefresh(false)

    agent.covidAgent.newsFeed().then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [refresh])

  if (loading) {
    return <PaperLoadingScreen />
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead}>
          <TableRow>
            <TableCell colSpan="3">
              Latest News from Health Departments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={"newsfeed__" + row.source + i}>
              <TableCell component="th" scope="row">
                {row.source.name}
              </TableCell>
              <TableCell align="left">
                <Link href="{row.link}" alt="{row.title}">
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>
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
