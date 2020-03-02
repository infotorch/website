import React, { useState, forwardRef } from "react"
import MaterialTable from "material-table"
import numeral from "numeral"
import data from "../../data/grants_seat.json"

import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

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
