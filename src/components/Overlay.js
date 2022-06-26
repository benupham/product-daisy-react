import React from "react"
import "../css/Overlay.css"
import { deptsClassLookup } from "../constants"
import { wrapName } from "../utilities"

export default class Overlay extends React.Component {
  componentDidMount() {
    this.nameRef = React.createRef()
    // Injects the product name inside the wrap rect
    wrapName(this.nameRef.current, this.props)
  }

  render() {
    let x, y, width, height
    if (this.props.bounds !== undefined && this.props.bounds.length > 0) {
      const bounds = this.props.bounds

      x = bounds[0][0]
      y = bounds[0][1]
      width = Math.abs(bounds[1][0] - x)
      height = Math.abs(bounds[1][1] - y)
    }
    let dept = ""
    if ((this.props.dept != null) & (this.props.dept !== 0)) {
      dept = deptsClassLookup[this.props.dept]
    } else {
      dept = deptsClassLookup[this.props.id]
    }

    return (
      <g ref={this.nameRef} transform={`translate(${x}, ${y})`}>
        <rect className={dept} width={width} height={height} />
      </g>
    )
  }
}
