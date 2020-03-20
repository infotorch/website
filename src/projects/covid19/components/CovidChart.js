import React, { useEffect, useState, useCallback } from "react"
import { ResponsiveLine } from "@nivo/line"
import agent from "../../../agent"

const colors = {
  NSW: "crimson",
  QLD: "darkblue",
  WA: "orange",
  VIC: "green",
  SA: "silver",
  TAS: "yellow",
}

const getColor = bar => colors[bar.id]

const SocialFollowingLookupChart = ({ username }) => {
  const [record, setRecord] = useState(undefined)

  useEffect(() => {
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
  }, [])

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
      margin={{ top: 50, right: 60, bottom: 80, left: 60 }}
      pointSize={6}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      // axisTop={null}
      // axisRight={null}
      // axisBottom={{
      //   tickSize: 1,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "% Followed",
      //   legendPosition: "middle",
      //   legendOffset: 30,
      // }}
      // axisLeft={{
      //   dataFrom: "indexes",
      //   tickSize: 1,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   format: a => record.filter(i => i.party_name === a)[0].party,
      //   legend: "Party",
      //   legendPosition: "middle",
      //   legendOffset: -50,
      // }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          // data: record.map(i => ({
          //   id: i.geo_long,
          //   label: i.geo_long,
          //   color: i.color,
          // })),
          dataFrom: "indexes",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: 65,
          itemsSpacing: 2,
          itemWidth: 55,
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
