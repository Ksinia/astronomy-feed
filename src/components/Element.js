import React, { Component } from "react";
import "../style/style.css";

export default class Element extends Component {
  render() {
    return (
      <div className="element">
        <h4 className="date">{this.props.date}</h4>
        <h3 className="title">{this.props.title}</h3>
        <div className="pictureAndText">
          <img className="picture" src={this.props.imgsrc}></img>
          <p className="description">{this.props.description}</p>
        </div>
        <div className="likes">{this.props.children}</div>
      </div>
    );
  }
}
