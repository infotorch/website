import React, { useState, useEffect } from "react"
import numeral from "numeral"
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

function StateForecastTable({ ...rest }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [forecast, setForecast] = useState(3)

  useEffect(() => {
    agent.covidAgent.forecastStates().then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <span>Loading ..</span>
  }

  return (
    <TableContainer>
      <BoxTitle heading="Forecasts for each state" />

      <Table aria-label="simple table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell className="whitespace-no-wrap font-semibold text-left">
              State
            </TableHeaderCell>
            <TableHeaderCell colSpan="1">Increase Rate</TableHeaderCell>
            {/* <TableCell colSpan="1">Doubles in</TableCell> */}
            <TableHeaderCell colSpan="1">
              <form variant="outlined" style={{ margin: 0 }} size="small">
                <select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={forecast}
                  onChange={e => setForecast(e.target.value)}
                >
                  <option value={3}>Three Day Forecast</option>
                  <option value={7}>Seven Day Forecast</option>
                </select>
              </form>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => (
            <TableRow key={"forecast_" + row.state_long}>
              <TableCell
                component="th"
                scope="row"
                className="whitespace-no-wrap pl-6 font-semibold text-left"
              >
                {row.state_long}
              </TableCell>
              <TableCell
                align="left"
                className="whitespace-no-wrap pl-6 text-left"
              >
                {numeral(row.r - 1).format("%0,0.0")}{" "}
                {/* {getIncrease(row.r, row.confirmed_2 / row.confirmed_3, false)}{" "} */}
              </TableCell>
              {/* <TableCell>
                {numeral(row.doubles_days).format("0.0")} days
              </TableCell> */}
              <TableCell className="whitespace-no-wrap pl-6 text-left">
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

export default StateForecastTable
