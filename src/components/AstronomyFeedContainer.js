import React, { Component } from "react";
import moment from "moment";
import AstronomyFeed from "./AstronomyFeed";
import PropTypes from "prop-types";

export default class AstronomyFeedContainer extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    addLike: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    updateCommentsAndLikes: PropTypes.func.isRequired,
    fetchImages: PropTypes.func.isRequired
  };
  state = {
    isSortedByDate: true,
    buttonText: "Sorted by date"
  };
  componentDidMount() {
    this.initializePage(this.getDates());

    document.addEventListener("scroll", () => {
      if (
        window.scrollY >=
        document.getElementById("feed").clientHeight - window.screen.height
      ) {
        this.props.fetchImages(this.getDates());
      }
    });
  }
  sorting = () => {
    if (this.state.isSortedByDate) {
      this.props.images.sort((a, b) => b.likes - a.likes);
    } else {
      this.props.images.sort(
        (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
      );
    }
    this.setState({
      isSortedByDate: !this.state.isSortedByDate,
      buttonText: this.state.isSortedByDate
        ? "Sorted by Likes"
        : "Sorted by date"
    });
  };
  getDates = () => {
    let start = null;
    if (this.props.images.length == 0) {
      start = moment().add(1, "days");
    } else {
      const existingDates = this.props.images.map(image =>
        new Date(image.date.split()).getTime()
      );
      const minTimestamp = Math.min.apply(Math, existingDates);
      start = moment(new Date(minTimestamp));
    }
    const initialDates = Array(5)
      .fill(null)
      .map(date => {
        // console.log("initialDates", date);
        return start.subtract(1, "days").format("YYYY-MM-DD");
      });
    return initialDates;
  };
  initializePage = async initialDates => {
    await this.props.fetchImages(initialDates);
    await this.props.updateCommentsAndLikes();
  };
  render() {
    return (
      <div>
        <AstronomyFeed
          images={this.props.images}
          addLike={this.props.addLike}
          saveComment={this.props.saveComment}
          sorting={this.sorting}
          buttonText={this.state.buttonText}
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
