import React, { useEffect, useState } from "react"
import { ResponsiveLine } from "@nivo/line"

const colors = {
  NSW: "crimson",
  QLD: "darkblue",
  WA: "orange",
  VIC: "green",
  SA: "silver",
  TAS: "yellow",
  AU: "Gold",
  UK: "darkblue",
  Italy: "green",
  Singapore: "crimson",
  Spain: "purple",
  "South Korea": "orange",
}

const getColor = bar => (bar.id in colors ? colors[bar.id] : "red")

const LineChartLog = ({ dataSource }) => {
  const [record, setRecord] = useState(undefined)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true)
    }, 1000 * 60 * 10)
  })

  useEffect(() => {
    setRefresh(false)
    dataSource()
      .then(data => {
        console.log(data)
        setRecord(data)
      })
      .catch(e => {
        console.error("req error", e)
        setRecord(undefined)
      })
  }, [refresh, dataSource])

  return record ? (
    <ResponsiveLine
      data={record}
      xScale={{
        type: "time",
        precision: "day",
        format: "%Y-%m-%d",
        // min: "auto",
        // max: "auto",
        // stacked: true,
        // reverse: false,
      }}
      colors={getColor}
      xFormat="time:%d-%B"
      yScale={{
        type: "log",
        base: 10,
        min: 10,
        max: 100000,
      }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisLeft={{
        tickValues: [10, 100, 1000, 10000, 100000],
        legend: "Number of cases (log 10)",
        legendPosition: "middle",
        legendOffset: -45,
      }}
      enableSlices={"x"}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 7 days",
        legend: "Date",
        legendPosition: "middle",
        legendOffset: 30,
      }}
      curve={"basis"}
      // enablePointLabel={true}
      margin={{ top: 20, right: 0, bottom: 80, left: 60 }}
      pointSize={0}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "indexes",
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateY: 20,
          translateX: 20,
          itemsSpacing: 5,
          itemWidth: 60,
          itemHeight: 25,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
    />
  ) : (
    <div />
  )
}

export default LineChartLog
