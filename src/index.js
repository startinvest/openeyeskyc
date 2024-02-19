// import React from "react";
// import ReactDOM from "react-dom";

// ReactDOM.render(<div>Hello world</div>, document.getElementById("root"));

import React from "react"
import { render } from "react-dom"
import { Step1, Step2, MultiStepForm } from "./lib"

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <Step2 />
  </div>
)

render(<App />, document.getElementById("root"))
