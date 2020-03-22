import React, { useEffect, useState } from "react"
import { ResponsiveLine } from "@nivo/line"
import agent from "../../../agent"

const colors = {
  NSW: "skyblue",
  QLD: "#800000",
  WA: "gold",
  VIC: "navy",
  SA: "red",
  TAS: "#006A4E",
  NT: "#E65A00",
}

const getColor = bar => colors[bar.id]

const SocialFollowingLookupChart = ({ username }) => {
  const [record, setRecord] = useState(undefined)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true)
    }, 1000 * 60 * 1)
  })

  useEffect(() => {
    setRefresh(false)

    agent.covidAgent
      .confirmedChart()
      .then(data =>
        data.map(i => ({
          id: i["geo"],
          color: getColor(i["geo"]),
          ...i,
        })),
      )
      .then(data => {
        setRecord(data)
      })
      .catch(e => {
        console.error("req error", e)
        setRecord(undefined)
      })
  }, [refresh])

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
        max: 1000,
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
        tickValues: "every 2 days",
        legend: "Date",
        legendPosition: "middle",
        legendOffset: 30,
      }}
      curve={"basis"}
      // enablePointLabel={true}
      margin={{ top: 20, right: 60, bottom: 80, left: 60 }}
      pointSize={6}
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
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: 65,
          itemsSpacing: 15,
          itemWidth: 60,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
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

export default SocialFollowingLookupChart
