import React, { useEffect, useState } from "react"
import agent from "../../agent"
import { BoxStat } from "../../ui"

const StatsBoxes = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.covidAgent
      .statTotals()
      .then(d => d.filter(a => a.state === "AU")[0])
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>loading..</div>
  }

  return (
    <>
      <BoxStat
        title="Confirmed Cases"
        stat={data.confirmed}
        change={data.confirmed_yesterday}
      />
      <BoxStat
        title="Deaths"
        stat={data.deaths}
        change={data.deaths_yesterday}
      />
      <BoxStat
        title="Tested"
        stat={data.tested}
        change={data.tested_yesterday}
      />
    </>
  )
}

export default StatsBoxes
