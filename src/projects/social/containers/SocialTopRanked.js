import React, { useState, useEffect } from "react"
import numeral from "numeral"
import { parseISO, format } from "date-fns"
import MaterialTable from "material-table"
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
    title: "Rank",
    field: "rank",
    filtering: false,
    sortable: true,
    width: 40,
  },
  {
    title: "Name",
    field: "twitter_profile__friends__profile_image",
    sortable: false,
    width: 40,
    filtering: false,
    render: rowData =>
      rowData.twitter_profile__friends__profile_image ? (
        <TwitterProfileImage
          url={rowData.twitter_profile__friends__profile_image}
          alt="profile pic"
        />
      ) : (
        undefined
      ),
  },
  {
    title: "",
    field: "twitter_profile__friends__display_name",
    filtering: false,
    sortable: true,
    width: 280,
  },
  {
    title: "",
    field: "twitter_profile__friends__username",
    filtering: false,
    sortable: false,
    width: 20,
    render: rowData =>
      rowData.twitter_profile__friends__username ? (
        <Twitter username={rowData.twitter_profile__friends__username} />
      ) : (
        undefined
      ),
  },
  {
    title: "",
    field: "twitter_profile__friends__verified",
    sortable: true,
    filtering: false,
    width: 20,
    render: rowData =>
      rowData["twitter_profile__friends__verified"] === true ? (
        <TwitterVerified />
      ) : (
        undefined
      ),
  },
  {
    title: "Twitter Followers",
    field: "twitter_profile__friends__follower_count",
    sortable: true,
    type: "numeric",
    filtering: false,
    render: data =>
      numeral(data.twitter_profile__friends__follower_count).format("0,0"),
  },
  {
    title: "Signed Up",
    field: "twitter_profile__friends__signup_date",
    sortable: true,
    type: "numeric",
    filtering: false,
    render: data =>
      format(parseISO(data.twitter_profile__friends__signup_date), "MMM R"),
  },
  {
    title: "APH Followers",
    field: "follow_count",
    sortable: true,
    defaultSort: "desc",
    type: "numeric",
    filtering: false,
  },
]

function Grid({ ...rest }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.api
      .reportTop()
      .then(r => r.data)
      .then(d =>
        d.map((record, index) => ({
          rank: index + 1,
          ...record,
        })),
      )
      .then(data => {
        console.log(data[0])
        setRows(data)
        setLoading(false)
      })
  }, [])

  return loading ? (
    <PaperLoadingScreen />
  ) : (
    <MaterialTable
      columns={columnMap}
      icons={tableIcons}
      data={rows}
      options={{
        filtering: true,
        pageSize: 25,
        pageSizeOptions: [25, 50, 100, 200],
      }}
      title=""
      {...rest}
    />
  )
}

const TopRanked = () => {
  const classes = style()

  return (
    <>
      <Paper className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Most Followed Rankings
        </Typography>
        <Typography variant="body1" gutterBottom>
          List of Twitter users that are most followed by Australian Members of
          Parliament
        </Typography>
      </Paper>
      <Grid />
    </>
  )
}

export default TopRanked
