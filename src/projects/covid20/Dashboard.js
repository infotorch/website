import React from "react"

// import Sidebar from "components/Sidebar.js"
// import LineChart from "components/LineChart.js"
// import BarChart from "components/BarChart.js"
import StateStatsTable from "./StateStatsTable"
import StateForecastTable from "./StateForecastTable"
import StateStatsChart from "./StateStatsChart"
import InternationalStatChart from "./InternationalStatChart"
import StatsBoxes from "./StatsBoxes"
import NewsFeed from "./NewsFeed"

import { BoxShadow } from "../../ui"

const HeaderTitle = () => (
  <div className="mt-4 w-full mb-6 ">
    <h6 className="font-bold text-2xl border-b-2 mx-4 border-solid">
      COVID-19 Dashboard Australia
    </h6>
  </div>
)

export default function Dashboard() {
  return (
    <>
      <div className="bg-gray-200 mt-12 mb-34">
        <div className="py-4 mt-12">
          <div className="px-4 mx-auto w-full">
            <HeaderTitle />
            {/* Card stats */}
            <div className="flex items-stretch flex-wrap">
              <StatsBoxes />
            </div>
          </div>
        </div>

        <div className="tablet:px-4 phone:px-2 mx-auto w-full ">
          <div className="flex flex-wrap">
            {/* <LineChart /> */}
            {/* <BarChart /> */}
          </div>
          <div className="flex flex-wrap mt-2">
            <BoxShadow large>
              <StateStatsTable />
            </BoxShadow>
            <BoxShadow large style={{ height: "550px" }}>
              <StateStatsChart />
            </BoxShadow>
            {/* <BoxShadow large>
              <StateForecastTable />
            </BoxShadow> */}
            <BoxShadow large style={{ height: "550px" }}>
              <InternationalStatChart />
            </BoxShadow>
            <BoxShadow large>
              <NewsFeed />
            </BoxShadow>
          </div>
        </div>
      </div>
    </>
  )
}
