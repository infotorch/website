import React, { useState, useEffect, useCallback } from "react"
import ReactGA from "react-ga"
import queryString from "query-string"
import numeral from "numeral"
import { useLocation, useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import MaterialTable from "material-table"
import tableIcons from "../../../components/TableIcons"
import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
import {
  Twitter,
  // TwitterVerified,
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
    border: "none",
    boxShadow: "",
    borderRadius: "",
    borderStyle: "solid",
  },
}))

const columnMap = [
  {
    field: "profile_image",
    sortable: false,
    width: 140,
    filtering: false,
    render: rowData =>
      rowData.profile_image ? (
        <TwitterProfileImage url={rowData.profile_image} alt="profile pic" />
      ) : (
        undefined
      ),
  },
  {
    title: "Name",
    field: "member.name",
    sortable: true,
    width: 230,
    filtering: false,
  },
  {
    title: "Electorate",
    field: "member.electorate",
    sortable: false,
    width: 140,
    filtering: false,
  },
  {
    title: "State",
    field: "member.state",
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
    field: "member.chamber",
    sortable: true,
    filtering: true,
    lookup: {
      HOUSE: "House",
      SENATE: "Senate",
    },
  },
  {
    title: "Party",
    field: "member.party_group",
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
    field: "username",
    filtering: false,
    sortable: false,
    width: 20,
    render: rowData =>
      rowData.username ? <Twitter username={rowData.username} /> : undefined,
  },
  // {
  //   title: "",
  //   field: "verified",
  //   sortable: true,
  //   filtering: false,
  //   width: 20,
  //   render: rowData => (rowData.verified ? <TwitterVerified /> : undefined),
  // },
  {
    title: "Followers",
    field: "follower_count",
    sortable: true,
    type: "numeric",
    filtering: false,
    defaultSort: "desc",
    render: data => numeral(data.follower_count).format("0,0"),
  },
  // {
  //   title: "Following",
  //   field: "following_count",
  //   sortable: true,
  //   type: "numeric",
  //   filtering: false,
  //   render: data => numeral(data.following_count).format("0,0"),
  // },
  // {
  //   title: "Tweets",
  //   field: "status_count",
  //   sortable: true,
  //   type: "numeric",
  //   filtering: false,
  //   render: data => numeral(data.status_count).format("0,0"),
  // },
]

const Table = ({ rows, ...rest }) => (
  <MaterialTable
    columns={columnMap}
    icons={tableIcons}
    data={rows}
    options={{
      filtering: true,
      pageSize: 25,
      pageSizeOptions: [25, 50, 100, 200],
    }}
    {...rest}
    title={""}
  />
)

const FollowingLookup = () => {
  const classes = style()
  const [rows, setRows] = useState([])
  const [username, setUsername] = useState()
  const [loading, setLoading] = useState(false)
  const [resultCount, setResultCount] = useState(0)
  const history = useHistory()
  const location = useLocation()
  const { register, handleSubmit, errors, reset, setValue } = useForm()

  const onSubmit = ({ username }, e) => {
    e.preventDefault()
    setRows([])

    history.push({
      search: queryString.stringify({
        username,
      }),
    })
  }

  const onReset = () => {
    reset()
    setRows([])
    setUsername(undefined)
    setResultCount(0)
    history.push({
      search: "",
    })
  }

  const doSearch = useCallback(() => {
    ReactGA.event({
      category: "follow_search",
      action: username,
    })

    agent.api
      .reportFollow(username)
      .then(r => r.data)
      .then(data => {
        setResultCount(data.length)
        setRows(data)
        setLoading(false)
      })
      .catch(e => {
        console.error("req error", e)
        setRows([])
        // setValue("username", "")
        setResultCount(0)
        setLoading(false)
      })
  }, [username])

  useEffect(() => {
    const params = queryString.parse(location.search)

    if (params.username) {
      let username_clean = params.username.replace(/[^a-zA-Z0-9_+]/g, "")
      setUsername(username_clean)
      // setValue("username", username_clean)
    }

    if (username) {
      doSearch(username)
    }
  }, [location, username, doSearch, setValue])

  return (
    <>
      <Paper className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Australian Parliament Follower Lookup
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter a twitter username below to lookup which members of Australian
          parliament are following that user.
        </Typography>
      </Paper>
      <Paper className={classes.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Twitter />
            </Grid>
            <Grid item xs={10} md={6}>
              <TextField
                id="input-with-icon-grid"
                label="Twitter username"
                inputRef={register}
                defaultValue={username}
                name="username"
                style={{ width: "100%" }}
                inputProps={{
                  pattern: "^@?[A-Za-z0-9_]{1,32}",
                  title: "Valid twitter username",
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <p>{errors.email && "Invalid username"}</p>
              <Button
                type="submit"
                size="medium"
                color="primary"
                variant="contained"
              >
                Lookup
              </Button>{" "}
              <Button onClick={onReset} size="medium" variant="contained">
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {username ? (
        loading ? (
          <PaperLoadingScreen />
        ) : (
          <>
            {username && (
              <Paper className={classes.container}>
                <Typography variant="body1" gutterBottom>
                  @{username} is followed by {resultCount} members of parliament
                </Typography>
              </Paper>
            )}
            {rows.length ? (
              <Table
                style={{}}
                rows={rows}
                className={classes.table}
                isLoading={loading}
                twitterUser={username}
                count={resultCount}
              />
            ) : (
              undefined
            )}
          </>
        )
      ) : (
        undefined
      )}
    </>
  )
}

export default FollowingLookup
