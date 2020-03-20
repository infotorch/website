import React, { useEffect, useState, useCallback } from "react"
import { ResponsiveLine } from "@nivo/line"
import agent from "../../../agent"

const colors = {
  NSW: "crimson",
  QLD: "darkblue",
  WA: "orange",
  VIC: "green",
  SA: "silver",
  TAS: "darkyellow",
}

const getColor = bar => colors[bar]

const SocialFollowingLookupChart = ({ username }) => {
  const [record, setRecord] = useState(undefined)

  const doReq = useCallback(() => {
    agent.covidAgent
      .confirmedChart()
      // .then(data =>
      //   data.map(i => ({
      //     id: data["geo"],
      //     color: getColor(data["geo"]),
      //   })),
      // )
      // .then(r =>
      //   Object.keys(r).map(i => ({
      //     party: i,
      //     percentage: r[i],
      //     color: colors[i],
      //   })),
      // )
      // .then(data => data.sort((a, b) => (a.percentage < b.percentage ? 1 : -1)))
      .then(data => {
        setRecord(data)
      })
      .catch(e => {
        console.error("req error", e)
        setRecord(undefined)
      })
  }, [])

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
      // .then(r =>
      //   Object.keys(r).map(i => ({
      //     party: i,
      //     percentage: r[i],
      //     color: colors[i],
      //   })),
      // )
      // .then(data => data.sort((a, b) => (a.percentage < b.percentage ? 1 : -1)))
      .then(data => {
        setRecord(data)
      })
      .catch(e => {
        console.error("req error", e)
        setRecord(undefined)
      })
  }, [])

  console.log(record)

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
        legendOffset: -52,
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 3 days",
        legend: "Date",
        legendOffset: 40,
      }}
      curve={"basis"}
      // enablePointLabel={true}
      margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
      pointSize={6}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
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
      // labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          // data: record.map(i => ({
          //   id: i.geo_long,
          //   label: i.geo_long,
          //   color: i.color,
          // })),
          dataFrom: "indexes",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
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
      // animate={true}
      // motionStiffness={90}
      // motionDamping={15}
      useMesh={true}
    />
  ) : (
    <div />
  )
}

export default SocialFollowingLookupChart
