// import axios from "axios"
import { setup } from "axios-cache-adapter"

const API_ROOT = process.env.REACT_APP_API_ENDPOINT

// const encode = encodeURIComponent

const agent = setup({
  baseURL: API_ROOT,
  timeout: 30000,
  // headers: { Authorization:  },
  validateStatus: function(status) {
    return status >= 200 && status < 403 // default
  },
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: { query: false },
  },
})

export const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    console.error(err)
  }
  return err
}

const requests = {
  del: url => agent.del(url),
  // .end(handleErrors)
  // .then(responseBody),
  get: url => agent.get(url),
  put: (url, body) => agent.put(url, body),
  post: (url, body) => agent.post(url, body),
}

const api = {
  members: () => requests.get("/api/members/"),
  reportFollow: username =>
    requests.get(`/api/report/aph/follow/?username=${username}`, {
      u: username,
    }),
  reportTop: () => requests.get("/api/report/aph/top/"),
  topTweets: (rank = "retweet", time = 1) =>
    requests.get(`/api/top/aph/?type=${rank}&time=${time}`).then(r => r.data),
}

export default {
  api,
}
