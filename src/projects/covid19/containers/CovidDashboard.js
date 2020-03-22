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
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { IoMdArrowDropupCircle } from "react-icons/io"
import { IoMdArrowDropdownCircle } from "react-icons/io"

import CovidChart from "../components/CovidChart"
import CovidAUInternationalLineChart from "./CovidAUInternationalLineChart"
import StateForecastTable from "../components/StateForecastTable"
import NewsFeed from "../components/NewsFeed"

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
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true)
    }, 1000 * 60 * 1)
  })

  useEffect(() => {
    setRefresh(false)
    agent.covidAgent.statTotals().then(data => {
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

const ContinerCard = ({ title, className, children }) => (
  <Card className={className}>
    <CardContent>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
)

const CovidDashboard = () => {
  const classes = style()

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={12} lg={6}>
          <TopStatsTable />
        </Grid>
        <Grid item md={12} lg={6}>
          <StateForecastTable />
        </Grid>
        <Grid item xs>
          <ContinerCard
            className={classes.chart}
            title={"Confirmed cases by state growth rate (log scale)"}
          >
            <CovidChart />
          </ContinerCard>
        </Grid>
        <Grid item md={12} lg={6}>
          <ContinerCard
            className={classes.chart}
            title={
              "Confirmed case growth rate Australia and select countries (log scale)"
            }
          >
            <CovidAUInternationalLineChart />
          </ContinerCard>
        </Grid>
        <Grid item md={12} lg={6}>
          <NewsFeed />
        </Grid>
      </Grid>
    </div>
  )
}

export default CovidDashboard
