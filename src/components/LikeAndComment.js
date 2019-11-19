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

  addLike = () => {
    this.setState({
      ...this.state,
      numLikes: this.state.numLikes + 1
    });
  };
  submitComment = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
  };
  //   handleLikeClick = () => { //just an example of arrow function
  //     console.log("hello 2");
  //   };

  render() {
    return (
      <div className="reactions">
        <div className="existing-reactions">
          <div className="likes">{this.state.numLikes} likes</div>
          <div className="comments">
            <h4>Comments:</h4>
            {this.state.comments.map(comment => {
              return <Comment name={comment.name} msg={comment.msg} />;
            })}
          </div>
        </div>

        <div className="add-reactions">
          <button className="likebutton" onClick={this.addLike}>
            Like!
          </button>
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
