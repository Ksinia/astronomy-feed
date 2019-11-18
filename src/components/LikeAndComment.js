import React, { Component } from "react";
import "./LikeAndComment.css";

export default class LikeAndComment extends Component {
  handleLikeClick = () => {
    console.log("hello 2");
  };
  render() {
    return (
      <div className="reactions">
        <div className="existing-reactions">
          <div className="likes">36 likes</div>
          <div className="comments">
            <h4>Comments</h4>
            <div className="comment">
              <h5>Mitya said:</h5>
              <p>"This is definitely one of my favorites!"</p>
            </div>
          </div>
        </div>

        <div className="add-reactions">
          <button className="likebutton" onClick={this.handleLikeClick}>
            Like!
          </button>
          <form onsubmit="submitComment(); return false">
            <div className="formSection">
              <label for="name">Name:</label>
              <input type="text" id="name" />
            </div>
            <div className="formSection">
              <label for="msg">Comment:</label>
              <textarea id="msg"></textarea>
            </div>
            <div className="button">
              <button type="default">Post your comment</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
