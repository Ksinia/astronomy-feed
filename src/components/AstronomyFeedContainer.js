import React, { Component } from 'react';
import moment from "moment";
import AstronomyFeed from './AstronomyFeed'
import PropTypes from 'prop-types'

export default class AstronomyFeedContainer extends Component {
  static propTypes = {
    images: PropTypes.string.isRequired,
    addLike: PropTypes.string.isRequired,
    saveComment: PropTypes.string.isRequired,
    updateCommentsAndLikes: PropTypes.string.isRequired,
    fetchImages: PropTypes.string.isRequired
  }
  componentDidMount() {
    this.initializePage(this.getDates());
    window.addEventListener("scroll", () => {
      if (
        window.scrollY >=
        document.getElementById("feed").clientHeight - window.screen.height
      ) {
        this.props.fetchImages(this.getDates());
      }
    });
  }
  getDates = () => {
    let start = null;
    if (this.props.images.length == 0) {
      start = moment();
    } else {
      const existingDates = this.props.images.map(image =>
        new Date(image.date.split()).getTime()
      );
      const minTimestamp = Math.min.apply(Math, existingDates);
      start = moment(new Date(minTimestamp));
    }
    const initialDates = Array(5)
      .fill(null)
      .map((date, index) => {
        return start.subtract(index, "days").format("YYYY-MM-DD");
      });
    return initialDates;
  }
  initializePage = async (initialDates) => {
    await this.props.fetchImages(initialDates);
    await this.props.updateCommentsAndLikes();
  }
  render() {
    return (
      <div>
        <AstronomyFeed
          images={this.props.images}
          addLike={this.props.addLike}
          saveComment={this.props.saveComment}
        />
      </div>
    );
  }
}

// required props:
// - images: object from the api
// - addLike callback method
// - saveComment callback method
// - updateCommentsAndLikes callback method