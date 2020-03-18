import React, { useState, useEffect } from "react"
import MaterialTable from "material-table"
import numeral from "numeral"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import tableIcons from "../../../components/TableIcons"
import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
import {
  Twitter,
  TwitterVerified,
  TwitterProfileImage,
} from "../../../components/SocialIcons"
import agent from "../../../agent"

const style = makeStyles(theme => ({
  container: {
    padding: "30px",
    marginBottom: "30px",
  },
  table: {
    marginTop: "30px",
  },
}))

const columnMap = [
  {
    title: "",
    field: "rank",
    filtering: false,
    sortable: true,
    width: 10,
  },
  {
    title: "Name",
    field: "twitter_profile.profile_image",
    sortable: false,
    filtering: false,
    width: 100,
    render: rowData =>
      rowData.twitter_profile.profile_image ? (
        <TwitterProfileImage
          url={rowData.twitter_profile.profile_image}
          alt="profile pic"
        />
      ) : (
        undefined
      ),
  },
  {
    // title: "Member Name",
    field: "name",
    filtering: false,
    sortable: true,
    width: 230,
  },
  {
    title: "Electorate",
    field: "electorate",
    filtering: false,
    sortable: false,
    width: 140,
  },
  {
    title: "State",
    field: "state",
    sortable: true,
    filtering: true,
    width: 80,
    lookup: {
      NSW: "NSW",
      VIC: "VIC",
      QLD: "QLD",
      TAS: "TAS",
      SA: "SA",
      WA: "WA",
      ACT: "ACT",
      NT: "NT",
    },
  },
  {
    title: "Chamber",
    field: "chamber",
    sortable: true,
    filtering: true,
    lookup: {
      HOUSE: "House",
      SENATE: "Senate",
    },
  },
  {
    title: "Party",
    field: "party_group",
    sortable: true,
    filtering: true,
    lookup: {
      ALP: "Labor",
      COA: "Coalition",
      IND: "Independent",
      GRN: "Greens",
      ONP: "One Nation",
      CA: "Centre Alliance",
    },
  },
  {
    title: "",
    field: "twitter_profile.username",
    filtering: false,
    sortable: false,
    width: 20,
    render: rowData =>
      rowData.twitter_profile.username ? (
        <Twitter username={rowData.twitter_profile.username} />
      ) : (
        undefined
      ),
  },
  // {
  //   title: "",
  //   field: "twitter_profile.verified",
  //   filtering: false,
  //   sortable: true,
  //   width: 20,
  //   render: rowData =>
  //     rowData.twitter_profile.verified ? <TwitterVerified /> : undefined,
  // },
  {
    title: "Followers",
    field: "twitter_profile.follower_count",
    filtering: false,
    sortable: true,
    type: "numeric",
    defaultSort: "desc",
    render: data => numeral(data.twitter_profile.follower_count).format("0,0"),
  },
  {
    title: "Following",
    field: "twitter_profile.following_count",
    filtering: false,
    sortable: true,
    type: "numeric",
    render: data => numeral(data.twitter_profile.following_count).format("0,0"),
  },
  {
    title: "Tweets",
    field: "twitter_profile.status_count",
    filtering: false,
    sortable: true,
    type: "numeric",
    render: data => numeral(data.twitter_profile.status_count).format("0,0"),
  },
]

const Grid = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    agent.api
      .members()
      .then(r => r.data)
      .then(d =>
        d.map((record, index) => ({
          rank: index + 1,
          ...record,
        })),
      )
      .then(data => {
        setRows(data)
        setLoading(false)
      })
  }, [])

  return loading ? (
    <PaperLoadingScreen />
  ) : (
    <MaterialTable
      columns={columnMap}
      data={rows}
      icons={tableIcons}
      options={{
        sortable: false,
        width: 140,
        filtering: true,
        pageSize: 25,
        pageSizeOptions: [25, 50, 100, 200],
        title: "",
      }}
    />
  )
}

const MemberRanked = () => {
  const classes = style()

  return (
    <div className="App">
      <Paper className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Australian Members of Parliament Twitter Accounts
        </Typography>
        <Typography variant="body1" gutterBottom>
          List of all Australian members of parliament with a Twitter account
          ranked by followers.
        </Typography>
      </Paper>
      <Grid />
    </div>
  )
}

export default MemberRanked
