import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import PaperLoadingScreen from "../../../components/PaperLoadingScreen"
import agent from "../../../agent"

const style = makeStyles(theme => ({
  container: {
    padding: "30px",
    marginBottom: "30px",
  },
  table: {
    marginTop: "30px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const TwitterEmbed = ({ tweetUser, tweetId }) => (
  <blockquote
    className="twitter-tweet"
    style={{ display: "inline-block", marginBottom: "20px" }}
  >
    <a href={"https://twitter.com/" + tweetUser + "/status/" + tweetId}>
      &nbsp;
    </a>
  </blockquote>
)

const RankedTweets = ({ rank, time }) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("run query")
    setLoading(true)

    agent.api.topTweets(rank, time).then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [rank, time])

  useEffect(() => {
    if (window.twttr) {
      window.twttr.ready(() => {
        window.twttr.widgets.load()
      })
    }
  }, [rows])

  if (loading) {
    return <PaperLoadingScreen />
  }

  return (
    <div id="twitter_container" style={{ width: "498px", margin: "0 auto" }}>
      {rows.map((i, key) => (
        <TwitterEmbed
          key={"tweet_" + key}
          tweetUser={i.twitter_profile__username}
          tweetId={i.twitter_profile__tweets__id}
        />
      ))}
    </div>
  )
}

const MemberRanked = () => {
  const classes = style()
  const [rank, setRank] = React.useState("retweet")
  const [time, setTime] = React.useState(1)

  return (
    <div className="App">
      <Paper className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Top Tweets
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={rank}
            onChange={e => setRank(e.target.value)}
          >
            <MenuItem value={"retweet"}>Retweeted</MenuItem>
            <MenuItem value={"fav"}>Favorites</MenuItem>
            <MenuItem disabled value={"ratio"}>
              Ratiod
            </MenuItem>
          </Select>
        </FormControl>{" "}
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <MenuItem value={1}>Day</MenuItem>
            <MenuItem disabled value={7}>
              Week
            </MenuItem>
            <MenuItem disabled value={100}>
              All Time
            </MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <RankedTweets rank={rank} time={time} />
    </div>
  )
}

export default MemberRanked
