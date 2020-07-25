import React from "react"
import { render } from "react-dom"

const App = () => (
  <div className="container">
    <h1>Hello I am an app</h1>
  </div>
)

render(<App />, document.getElementById("root"))
