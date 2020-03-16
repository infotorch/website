import React, { useState } from "react"
import MaterialTable from "material-table"
import numeral from "numeral"
import data from "../data/grants_seat.json"
import tableIcons from "../../../components/TableIcons"
// import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
// import {
//   Twitter,
//   TwitterVerified,
//   TwitterProfileImage,
// } from "../../../components/SocialIcons"
// import agent from "../../../agent"

const defaultColumnProperties = {
  sortable: false,
  width: 140,
  filtering: false,
}

const columnMap = {
  electorate: {
    title: "Electorate",
  },
  candidate: {
    title: "Member Name",
    sortable: true,
    width: 230,
  },
  state: {
    title: "State",
    sortable: true,
    filtering: true,
    width: 80,
    lookup: {
      NSW: "NSW",
      VIC: "Victoria",
      QLD: "Queensland",
      TAS: "Tasmania",
      SA: "South Aus",
      WA: "West Aus",
      ACT: "ACT",
      NT: "NT",
    },
  },
  party: {
    title: "Party",
    sortable: true,
    filtering: true,
    lookup: {
      ALP: "Labor",
      LP: "Liberal",
      NP: "National",
      IND: "Independent",
      GRN: "Greens",
      LNP: "LNP",
      KAP: "Katter",
      XEN: "Xenophon",
    },
  },
  margin_votes: {
    title: "2016 Vote Margin",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
  margin: {
    title: "2016 Margin (%)",
    sortable: true,
    type: "numeric",
    filtering: false,
    render: data => numeral(data.margin).format("0.00") + "%",
  },
  Swing: {
    title: "2016 Swing (%)",
    sortable: true,
    type: "numeric",
    filtering: false,
    // render: data => numeral(data.Swing).format("+0.00") + "%"
  },
  amount: {
    title: "Grant Amount",
    sortable: true,
    type: "numeric",
    filtering: false,
    render: data => numeral(data.amount).format("$0,0"),
  },
  grants: {
    title: "Total Grants",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
}

const getColumns = d =>
  d.schema.fields.map(i => ({
    field: i["name"],
    ...defaultColumnProperties,
    ...columnMap[i["name"]],
  }))

const Grid = () => {
  const [rows, setRows] = useState(data.data)
  const columns = getColumns(data)

  return (
    <MaterialTable
      columns={columns}
      data={rows}
      icons={tableIcons}
      options={{
        filtering: true,
        pageSize: 20,
        pageSizeOptions: [20, 50, 100, 150],
      }}
      title="Sports Grants by 2016 Electorate"
    />
  )
}

const Data = () => (
  <div className="App">
    <Grid />
  </div>
)

export default Data
