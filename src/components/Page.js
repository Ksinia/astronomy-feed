import React, { Component } from "react";
import "../style/style.css";

export default class Page extends Component {
  render() {
    return (
      <div className="page">
        <div className="feed-column">{this.props.children}</div>
        <p className="pagenumber">{this.props.pagenumber}</p>
      </div>
    );
  }
}
