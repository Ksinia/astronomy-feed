import React, { Component } from "react";

//turned this component into more simple function component
//that just returns what should be rendered
function Comment(props) {
  return (
    <div className="comment">
      <h5>{props.name} said:</h5>
      <p>{props.msg}</p>
    </div>
  );
}

export default Comment;
