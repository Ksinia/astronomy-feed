import React, { Component } from "react";
import Element from "./Element";

class SinglePostPageContainer extends Component {
  state = {};

  componentDidMount() {
    const date = this.props.match.params.date;
    console.log("date to fetch", date);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=XOVbZ8gIyfZTNb0PJgmggUPqwgQVM319jG35pZjg&date=${date}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          id: data.date,
          title: data.title,
          description: data.explanation,
          mediasrc: data.hdurl,
          mediaType: data.media_type
        })
      )
      .catch(console.error);
  }

  render() {
    console.log(this.state);
    return (
      <Element
        key={this.state.id}
        mediaType={this.state.mediaType}
        mediasrc={this.state.mediasrc}
        title={this.state.title}
        date={this.state.date}
        description={this.state.description}
      />
    );
  }
}

export default SinglePostPageContainer;
