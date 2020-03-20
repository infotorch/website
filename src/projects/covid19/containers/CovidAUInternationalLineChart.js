import React from "react"
import LineChartLog from "../components/LineChartLog"
import agent from "../../../agent"

const CovidAUInternationalLineChart = () => (
  <LineChartLog dataSource={agent.covidAgent.countryComp} />
)

export default CovidAUInternationalLineChart
