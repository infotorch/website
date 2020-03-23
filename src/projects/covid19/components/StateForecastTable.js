import React, { useState, useEffect } from "react"
import numeral from "numeral"
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
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import getIncrease from "./IncreaseArrows"

const style = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: "30px",
    marginBottom: "30px",
  },
  table: {},
  chart: {
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "white",
  },
}))

function StateForecast({ ...rest }) {
  const classes = style()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const [forecast, setForecast] = useState(3)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true)
    }, 1000 * 60 * 5)
  })

  useEffect(() => {
    setRefresh(false)

    agent.covidAgent.forecastStates().then(data => {
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
            <TableCell colSpan="1">Increase Rate</TableCell>
            {/* <TableCell colSpan="1">Doubles in</TableCell> */}
            <TableCell colSpan="1">
              <FormControl
                variant="outlined"
                className={classes.formControl}
                style={{ margin: 0 }}
                size="small"
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={forecast}
                  onChange={e => setForecast(e.target.value)}
                >
                  <MenuItem value={3}>Three Day Forecast</MenuItem>
                  <MenuItem value={7}>Seven Day Forecast</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={"forecast_" + row.state_long}>
              <TableCell component="th" scope="row">
                {row.state_long}
              </TableCell>
              <TableCell align="left">
                {numeral(row.r - 1).format("%0,0.0")}{" "}
                {getIncrease(row.r, row.confirmed_2 / row.confirmed_3, false)}{" "}
              </TableCell>
              {/* <TableCell>
                {numeral(row.doubles_days).format("0.0")} days
              </TableCell> */}
              <TableCell>
                {numeral(forecast === 3 ? row.forecast3 : row.forecast7).format(
                  "0,0",
                )}
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
