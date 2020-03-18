import React, { useEffect, useState, useCallback } from "react"
import { Bar } from "@nivo/bar"
import agent from "../../../agent"

const colors = {
  ALP: "crimson",
  COA: "darkblue",
  CA: "orange",
  GRN: "green",
  IND: "silver",
  ONP: "darkyellow",
}

const partyMap = {
  ALP: "Labor",
  COA: "Coalition",
  CA: "Centre Alliance",
  GRN: "Greens",
  IND: "Independent",
  ONP: "One Nation",
}

const getColor = bar => bar.data.color

const SocialFollowingLookupChart = ({ username }) => {
  const [record, setRecord] = useState(undefined)
  const doReq = useCallback(() => {
    agent.api
      .reportFollowChart(username)
      .then(r => r.data)
      .then(r =>
        Object.keys(r).map(i => ({
          party: i,
          percentage: r[i],
          party_name: partyMap[i],
          color: colors[i],
        })),
      )
      .then(data => data.sort((a, b) => (a.percentage < b.percentage ? 1 : -1)))
      .then(data => {
        setRecord(data)
      })
      .catch(e => {
        console.error("req error", e)
        setRecord(undefined)
      })
  }, [username])

  useEffect(() => {
    if (username) {
      doReq(username)
    }
  }, [username, doReq])

  return record ? (
    <Bar
      data={record}
      colors={getColor}
      keys={["percentage"]}
      index="party_name"
      indexBy="party_name"
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      width={630}
      layout="horizontal"
      height={250}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 1,
        tickPadding: 5,
        tickRotation: 0,
        legend: "% Followed",
        legendPosition: "middle",
        legendOffset: 30,
      }}
      axisLeft={{
        dataFrom: "indexes",
        tickSize: 1,
        tickPadding: 5,
        tickRotation: 0,
        format: a => record.filter(i => i.party_name === a)[0].party,
        legend: "Party",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          data: record.map(i => ({
            id: i.party_name,
            label: i.party_name,
            color: i.color,
          })),
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
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  ) : (
    <div />
  )
}

export default SocialFollowingLookupChart
