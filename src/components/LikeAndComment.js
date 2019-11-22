import React, { Component } from "react";
import "./LikeAndComment.css";
import Comment from "./Comment";

export default class LikeAndComment extends Component {
  state = {
    numLikes: 0,
    comments: [
      { name: "Mitya", msg: "I like it" },
      { name: "Ksenia", msg: "Nice" }
    ],
    currentAuthor: '',
    currentMessage: ''
  };

  submitComment = event => {
    event.preventDefault();
    this.props.saveComment(this.state.currentAuthor, this.state.currentMessage, this.props.id)
    this.setState({
      comments: [...this.state.comments, {
        name: this.state.currentAuthor,
        msg: this.state.currentMessage
      }],
      currentAuthor: '',
      currentMessage: ''
    })
  };
  handleChangeAuthor = event => {
    this.setState({
      currentAuthor: event.target.value
    })
  }
  handleChangeComment = event => {
    this.setState({
      currentMessage: event.target.value
    })
  }
  likeClick = () => {
    this.props.addLike(this.props.id);
  };
  render() {
    return (
      <div className="reactions">
        <div className="likesAndAdd">
          <button className="likebutton" onClick={this.likeClick}>
            Like!
          </button>
          <h3 className="likes">{this.props.likes} likes</h3>
        </div>
        <div className="commentsAndAdd">
          <div className="comments">
            <h4>Comments:</h4>
            {this.props.comments.map(comment => {
              return <Comment name={comment.author} msg={comment.message} key={comment.message} />;
            })}
            {this.state.comments.map(comment => {
              return <Comment name={comment.name} msg={comment.msg} key={comment.msg} />;
            })}
          </div>

          <form onSubmit={this.submitComment}>
            <div className="formSection">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={this.handleChangeAuthor} value={this.state.currentAuthor} />
            </div>
            <div className="formSection">
              <label htmlFor="msg">Comment:</label>
              <textarea id="msg" onChange={this.handleChangeComment} value={this.state.currentMessage}></textarea>
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
