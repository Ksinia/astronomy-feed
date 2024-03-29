import React, { Component } from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

export default class Element extends Component {
  render() {
    return (
      <div className="element">
        <h4 className="date">
          <Link to={`${encodeURIComponent(this.props.date)}`}>
            {this.props.date}
          </Link>
        </h4>
        <h3 className="title">{this.props.title}</h3>
        <div className="pictureAndText">
          {this.props.mediaType === "image" ? (
            <img className="picture" src={this.props.mediasrc} alt="astronomy"></img>
          ) : (
              <iframe
                title={this.props.title}
                className="picture"
                width="420"
                height="315"
                src={this.props.mediasrc}
                alt="video"
              ></iframe>
            )}
          <p className="description">{this.props.description}</p>
        </div>
        <div className="likes">{this.props.children}</div>
      </div>
    );
  }
}
