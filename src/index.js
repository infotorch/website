import React, { useState } from "react"
import ReactDOM from "react-dom"
import ReactMapGL, { Layer, NavigationControl, Source } from "react-map-gl"
import "./index.css"
import "mapbox-gl/dist/mapbox-gl.css"
import electorateLabels from "./electorate_labels.json"

const defaultViewport = {
  width: "100vw",
  height: "100vh",
  latitude: -34.0639898554235,
  longitude: 151.38001034244547,
  zoom: 9,
}

const aec2016Layer = {
  id: "aec_2016_fed",
  type: "line",
  "source-layer": "AEC_2016_FEC-bidn3y",
  paint: { "line-color": "red", "line-width": 1 },
  // filter: ["==", "class", "park"],
}

const l = {
  id: "aec_2016_fed_labels",
  type: "symbol",
  // "source-layer": "AEC_2016_FEC-bidn3y",
  layout: {
    // "text-field": ["get", "Sortname"],
    "text-field": [
      "format",
      ["upcase", ["get", "Sortname"]],
      { "font-scale": 0.8 },
      "\n",
      {},
      ["downcase", ["get", "State"]],
      { "font-scale": 0.6 },
    ],
    // "text-color": "red",
    // "line-width": 1,
    // "text-anchor": "top",
    // "text-allow-overlap ": true,
  },
}

const App = () => {
  const [viewport, setViewport] = useState(defaultViewport)

  const updateViewport = state => {
    // console.log(state)
    setViewport(state)
  }

  return (
    <ReactMapGL
      // mapStyle="mapbox://styles/infotorch/ck772oncb0zed1jpgyzjuwq92"
      mapStyle="mapbox://styles/mapbox/light-v10"
      {...viewport}
      onViewportChange={updateViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
    >
      <div style={{ position: "absolute", right: 0 }}>
        <NavigationControl />
      </div>
      <Source type="geojson" data={electorateLabels}>
        <Layer {...l} />
      </Source>
      <Source type="vector" url="mapbox://infotorch.2nfk1g0s">
        <Layer {...aec2016Layer} />
      </Source>
    </ReactMapGL>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
