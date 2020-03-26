import React from "react"

// import Sidebar from "components/Sidebar.js"
// import LineChart from "components/LineChart.js"
// import BarChart from "components/BarChart.js"
import StateStatsTable from "./StateStatsTable"
import StateForecastTable from "./StateForecastTable"
import StateStatsChart from "./StateStatsChart"
import InternationalStatChart from "./InternationalStatChart"

import { FaArrowDown } from "react-icons/fa"
import { FaArrowUp } from "react-icons/fa"

const Box = props => {
  let classes = "sm:w-full phone:w-1/2 tablet:w-1/2 desktop:w-1/4 phone:px-2 "

  if (props.large) {
    classes = "phone:w-full tablet:w-1/2 desktop:w-1/2 px-4 overflow-x-hidden"
  }

  if (props.small) {
    classes = "phone:w-1/3 tablet:w-1/4 desktop:w-1/6 px-4"
  }

  if (props.class) {
    classes += props.class
  }

  return (
    <div class={classes} {...props}>
      {props.children}
    </div>
  )
}

const BoxShadow = props => (
  <Box large>
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 py-3 border-0 full-y" {...props}>
        {props.children}
      </div>
    </div>
  </Box>
)

const StatsBox = ({ title, stat, change }) => {
  return (
    <Box>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6  xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-600 uppercase mb-4 font-bold text">
                {title}
              </h5>
              <span className="font-semibold text-3xl text-gray-800">
                {stat}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                <FaArrowUp className="w-20 h-20" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <span className="text-green-500 mr-2">
              <i className="fas fa-arrow-up"></i> {change}
            </span>
            <span className="whitespace-no-wrap">Since yesterday</span>
          </p>
        </div>
      </div>
    </Box>
  )
}

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
              <StatsBox title="Confirmed Cases" stat="2810" change="92" />
              <StatsBox title="Deaths" stat="12" change="5" />
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
            <BoxShadow large>
              <StateForecastTable />
            </BoxShadow>
            <BoxShadow large style={{ height: "550px" }}>
              <InternationalStatChart />
            </BoxShadow>
          </div>
        </div>
      </div>
    </>
  )
}
