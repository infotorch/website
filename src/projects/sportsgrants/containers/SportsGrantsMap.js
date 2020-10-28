import React, { useState, useRef } from "react"
import chroma from "chroma-js"
import numeral from "numeral"
import ReactMapGL, {
  Layer,
  NavigationControl,
  Source,
  Popup,
} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import electorateLabels from "../data/electorate_labels.json"
import grantsPlots from "../data/grants_plots.json"
import MapPins from "../components/MapPin"

const defaultViewport = {
  width: "100%",
  height: "100%",
  latitude: -34.0639898554235,
  longitude: 151.38001034244547,
  zoom: 9,
}

const navStyle = {
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: "20px",
}

const parties = [
  {
    value: "ALP",
    name: "Labor Party",
    legend: true,
    color: "red",
  },
  {
    value: "GRN",
    name: "Greens",
    // legend: true,
    color: "green",
  },
  {
    value: "IND",
    name: "Independents",
    legend: true,
    color: "grey",
  },
  {
    value: "KAP",
    legend: false,
    color: "orange",
  },
  {
    value: "LP",
    legend: false,
    color: "blue",
  },
  {
    value: "LNP",
    name: "Liberal/National Coalition",
    legend: true,
    color: "blue",
  },
  {
    value: "NP",
    legend: false,
    color: "blue",
  },
  {
    value: "XEN",
    legend: false,
    color: "orange",
  },
]

const marginalities = [
  {
    value: "Marginal",
    color: 3,
  },
  {
    value: "Fairly Safe",
    color: 2.6,
  },
  {
    value: "Safe",
    color: 2.2,
  },
  {
    value: "Very Safe",
    color: 2,
  },
]

const election_2016_labels = {
  id: "election_2016_labels",
  type: "symbol",
  // "source-layer": "AEC_2016_FEC-bidn3y",
  layout: {
    // "text-field": ["get", "Sortname"],
    "text-field": [
      "format",
      ["upcase", ["get", "Sortname"]],
      { "font-scale": 0.8 },
    ],

    // "text-color": "red",
    // "line-width": 1,
    // "text-anchor": "top",
    // "text-allow-overlap ": true,
  },
}

const grantsLayer = {
  id: "grants_layer",
  type: "circle",
  "source-layer": "grants_plots",
  paint: {
    "circle-color": "red",
  },
  // layout: {
  //   // "text-field": ["get", "Sortname"],
  //   "text-field": [
  //     "format",
  //     ["upcase", ["get", "Sortname"]],
  //     { "font-scale": 0.8 },
  //   ],

  //   "icon-image": "marker",
  //   // "text-color": "red",
  //   // "line-width": 1,
  //   // "text-anchor": "top",
  //   // "text-allow-overlap ": true,
  // },
}

const grantInfoStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  // marginRight: "20px",
  overflow: "hidden",
  borderRadius: "3px",
  zIndex: 10000,
}

const GrantInfo = ({ feature: { properties, geometry }, onClick }) => (
  <Popup
    tipSize={5}
    anchor="top"
    longitude={geometry.coordinates[0]}
    latitude={geometry.coordinates[1]}
    closeOnClick={false}
    sortByDepth
    onClose={onClick}
  >
    <div className="w240 px12 py12 txt-s" style={grantInfoStyle}>
      <p className="txt-h3">
        <b>{properties.club}</b>
      </p>
      <hr className="txt-hr"></hr>
      <div>
        {properties.address
          .split(",")
          .map(
            (label, i) =>
              label.trim().toLowerCase() !== "australia" && (
                <p key={i}>{label}</p>
              ),
          )}
      </div>
      <p style={{ marginTop: "10px" }}>
        Awarded <b>{numeral(properties.amount).format("$0,0")}</b> in round{" "}
        {properties.rnd}
        {properties.round}
      </p>
    </div>
  </Popup>
)

const mapOverlayStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: "20px",
  padding: "10px",
  background: "rgba(255, 255, 255, 0.8)",
  marginRight: "20px",
  overflow: "hidden",
  borderRadius: "3px",
}

const MapOverlay = ({ electorate }) => (
  <div
    className="w240 round shadow-darken10 px12 py12 txt-s"
    style={mapOverlayStyle}
  >
    <p className="txt-h4">
      <b>Electorate</b>
    </p>
    <hr className="txt-hr"></hr>

    {!electorate && (
      <p>
        <i>Mouse over electorate</i>
      </p>
    )}
    {electorate && (
      <div>
        <p className="txt-h4">{electorate.electorate}</p>
        <p>{electorate.candidate}</p>
        <p style={{ marginTop: "10px" }}>
          {electorate.marginalit} {electorate.party} seat margin of{" "}
          {electorate.margin}%
        </p>
        <div className="grid grid--gut12" style={{ marginTop: "10px" }}>
          <div className="col col--8">
            <p>Number of grants</p>
          </div>
          <div className="col col--4">
            <p>{electorate.grants}</p>
          </div>
          <div className="col col--8">
            <p>Total grant funding</p>
          </div>
          <div className="col col--4">
            <p>{numeral(electorate.amount).format("$0,0")}</p>
          </div>
        </div>
      </div>
    )}
  </div>
)

const mapLegendStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  margin: "20px",
  padding: "10px",
  background: "rgba(255, 255, 255, 0.8)",
  overflow: "hidden",
  borderRadius: "3px",
}

const MapLegend = () => (
  <div
    className="w240 round shadow-darken10 px12 py12 txt-s"
    style={mapLegendStyle}
  >
    {parties
      .filter(p => p.legend)
      .map((party, i) => (
        <div key={i}>
          <strong className="block mb6">{party.name}</strong>
          <div className="grid mb6">
            {marginalities.map((marginality, k) => (
              <div
                key={i + "_" + k}
                className="col h12"
                style={{
                  backgroundColor: chroma(party.color)
                    .brighten(marginality.color)
                    .hex(),
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    <div className="grid txt-xs">
      {marginalities.map((margin, i) => (
        <div key={i} className="col align-center">
          {margin.value}
        </div>
      ))}
    </div>
  </div>
)

const Map = () => {
  const [viewport, setViewport] = useState(defaultViewport)
  const [popup, setPopup] = useState(false)
  const [regions, setRegions] = useState()
  const [hoverElectorate, setHoverElectorate] = useState(false)
  const [interactiveLayers, setInteractiveLayers] = useState(["grants_layer"])
  const mapEl = useRef(null)

  const onMouse = e => {
    if (!mapEl) return

    var states = mapEl.current.queryRenderedFeatures(e.point, {
      layers: interactiveLayers,
    })

    if (states && states.length) {
      setHoverElectorate(states[0].properties)
    } else {
      setHoverElectorate(false)
    }
  }

  const handleMapClick = e => {
    if (!mapEl) return

    var states = mapEl.current.queryRenderedFeatures(e.point, {
      layers: interactiveLayers,
    })

    if (states.length) {
      console.log(states)
      // setHoverElectorate(states[0].properties)
    } else {
      // setHoverElectorate(false)
    }
  }

  const generateElectoralRegions = () => {
    let il = []
    let layers = parties.map((party, i) =>
      marginalities.map((marginality, x) => {
        let layerName = "election_2016_" + party.value + "_" + marginality.value

        if (!il.includes(layerName)) {
          il = il.concat([layerName])
        }

        return (
          <Layer
            key={i + x}
            beforeId="admin-1-boundary-bg"
            {...{
              id: layerName,
              type: "fill",
              "source-layer": "AEC_2016_FED-cyvegr",
              filter: [
                "all",
                ["==", "party_grou", party.value],
                ["==", "marginalit", marginality.value],
              ],
              paint: {
                "fill-color": chroma(party.color)
                  .brighten(marginality.color)
                  .hex(),
                "fill-opacity": 0.3,
              },
            }}
          />
        )
      }),
    )
    setInteractiveLayers(il)
    return layers
  }

  console.log("REACT_APP_MAPBOX_API_KEY", process.env.REACT_APP_MAPBOX_API_KEY)

  return (
    <ReactMapGL
      // mapStyle="mapbox://styles/infotorch/ck772oncb0zed1jpgyzjuwq92"
      mapStyle="mapbox://styles/mapbox/light-v10"
      {...viewport}
      ref={mapEl}
      attributionControl={false}
      onViewportChange={setViewport}
      mapboxApiAccessToken="pk.eyJ1IjoiaW5mb3RvcmNoIiwiYSI6ImNrNzZ6YXBweTAyZHczZnA1aWxzMzBncmUifQ.RDyoU9CHYiDnL2XRyPwdTg"
      onMouseMove={onMouse}
      // onClick={handleMapClick}
      touchZoom={true}
      onLoad={e => setRegions(generateElectoralRegions())}
      interactiveLayerIds={interactiveLayers}
    >
      <div style={navStyle}>
        <NavigationControl showCompass={false} />
      </div>

      <MapOverlay electorate={hoverElectorate} />

      {popup && <GrantInfo feature={popup} onClick={() => setPopup(false)} />}

      <MapPins data={grantsPlots} onClick={setPopup} />

      <Source
        type="vector"
        url="mapbox://infotorch.ck783c07m4wll2kr7ilroev1u-7fg8b"
      >
        {/* <Layer {...grantsLayer} /> */}
      </Source>

      {/* <Source id="points" type="geojson" data={grantsPlots}>
         <Layer {...grants_plots} />
      </Source> */}
      <Source type="geojson" data={electorateLabels}>
        <Layer {...election_2016_labels} />
      </Source>

      <Source type="vector" url="mapbox://infotorch.1jcf72om">
        {regions}
      </Source>

      <MapLegend />
    </ReactMapGL>
  )
}

export default Map
