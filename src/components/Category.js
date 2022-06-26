import React from "react"
import "../css/Category.css"
import { d3var } from "../zoom"
import { wrapName } from "../utilities"

export default class Category extends React.Component {
  constructor(props) {
    super(props)
    this.nameRef = React.createRef()
  }

  componentDidMount() {
    wrapName(this.nameRef.current, this.props)
  }

  handleClick = (e) => {
    const isOpen = this.props.isOpen
    const itemId = this.props.id
    const clicked = d3var.clicked

    if (isOpen) {
      this.props.removeDescendants(itemId)
    } else {
      this.props.addChildren(itemId, clicked)
    }
  }

  render() {
    const x = this.props.x
    const y = this.props.y
    const sponsoredClass = this.props.sponsored ? "sponsored" : ""
    const open = this.props.isOpen ? "open" : ""

    return (
      <g
        className={`Category`}
        onClick={(e) => this.handleClick(e)}
        transform={`translate(${x}, ${y})`}
        ref={this.nameRef}>
        <rect className={`wrap ${this.props.type} ${sponsoredClass + " " + open}`}></rect>
      </g>
    )
  }
}
