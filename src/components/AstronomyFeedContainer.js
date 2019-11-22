import React, { Component } from 'react';
import moment from "moment";
import AstronomyFeed from './AstronomyFeed'

export default class AstronomyFeedContainer extends Component {
  // async initializePage(initialDates) {
  //   await this.props.fetchImages(initialDates);
  //   await this.props.updateCommentsAndLikes();
  // }
  // getDates() {
  //   let start = null;
  //   if (this.props.images.length == 0) {
  //     start = moment();
  //   } else {
  //     const existingDates = this.props.images.map(image =>
  //       new Date(image.date.split()).getTime()
  //     );
  //     const minTimestamp = Math.min.apply(Math, existingDates);
  //     start = moment(new Date(minTimestamp));
  //   }
  //   const initialDates = Array(5)
  //     .fill(null)
  //     .map((date, index) => {
  //       return start.subtract(index, "days").format("YYYY-MM-DD");
  //     });
  //   return initialDates;
  // }
  // componentDidMount() {
  //   this.initializePage(this.getDates());
  // }
  render() {
    return (
      <div>
        <AstronomyFeed
          images={this.props.images}
          addLike={this.props.addLike}
          saveComment={this.props.saveComment}
          fetchImages={this.props.fetchImages}
          getDates={this.props.getDates}
        />
      </div>
    );
  }
}

// required props:
// - images: object from the api
// - addLike callback method
// - saveComment callback method
// - fetchImages callback method
// - updateCommentsAndLikes callback method