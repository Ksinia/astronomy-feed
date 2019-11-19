import React, { Component } from "react";
import "./LikeAndComment.css";
import Comment from "./Comment";

export default class LikeAndComment extends Component {
  state = {
    numLikes: 0,
    comments: [
      { name: "Mitya", msg: "I like it" },
      { name: "Ksenia", msg: "Nice" }
    ]
  };

  //   submitComment = event => {
  //     event.preventDefault();
  //     const data = new FormData(event.target);
  //     console.log(data);
  //   };

  render() {
    return (
      <div className="reactions">
        <div className="likesAndAdd">
          <div className="likes">{this.props.likes} likes</div>
          <button className="likebutton" onClick={this.props.onClick}>
            Like!
          </button>
        </div>
        <div className="commentsAndAdd">
          <div className="comments">
            <h4>Comments:</h4>
            {this.state.comments.map(comment => {
              return <Comment name={comment.name} msg={comment.msg} />;
            })}
          </div>

          <form onSubmit={this.submitComment}>
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
