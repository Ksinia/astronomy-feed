import React from "react";
import "../App.css";
import Element from "./Element";
import LikeAndComment from "./LikeAndComment";

export default function AstronomyFeed(props) {
  return (
    <div className="App">
      <main>
        <div id="mainheader">
          <button onClick={() => props.sorting()}>{props.buttonText}</button>
          <h2>Gergo &amp; Ksenia Astronomy Feed</h2>
        </div>
        <section>
          <div id="leftpanel">Left panel</div>
          <div id="feed">
            {props.images.length == 0 && "Loading..."}
            {props.images.map(image => {
              return (
                <Element
                  key={image.date}
                  mediaType={image.media_type}
                  mediasrc={image.url}
                  title={image.title}
                  date={image.date}
                  description={image.explanation}
                >
                  <LikeAndComment
                    key={image.date}
                    id={image.date}
                    likes={image.likes}
                    comments={image.comments}
                    addLike={props.addLike}
                    saveComment={props.saveComment}
                  />
                </Element>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

//required props:
// - images: object from the api
// - addLike callback method
// - saveComment callback method
