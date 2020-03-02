import React, { useState, forwardRef } from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import "./index.css"

import fig1 from "./figures/funding-01.png"
import fig2 from "./figures/funding-02.png"

const Data = () => (
  <div className="App">
    <Paper style={{ padding: "10px" }}>
      <Typography variant="h4" gutterBottom>
        Sports Grants Charts
      </Typography>
      <img src={fig1} alt="fig1" />
      <img src={fig2} alt="fig2" />
    </Paper>
  </div>
)

export default Data
