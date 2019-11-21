import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Element from "./components/Element";
import Page from "./components/Page";
import LikeAndComment from "./components/LikeAndComment";
import moment from "moment";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  addLike = async id => {
    const updatedImages = this.state.images.map(img => {
      if (img.date === id) {
        return { ...img, likes: img.likes + 1 };
      } else {
        return img;
      }
    });
    const imgDate = id;
    const res = await fetch(`http://localhost:3004/likes/${imgDate}`);
    if (res.status === 404) {
      const objectToPush = {
        numberOfLikes: 1,
        imgDate
      };
      await fetch(`http://localhost:3004/likes`, {
        method: "POST",
        body: JSON.stringify(objectToPush),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else if (res.status === 200) {
      const data = await res.json();
      const objectToPush = {
        ...data,
        numberOfLikes: data.numberOfLikes + 1
      };
      await fetch(`http://localhost:3004/likes/${imgDate}`, {
        method: "PUT",
        body: JSON.stringify(objectToPush),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    this.setState({ images: updatedImages });
  };
  saveComment = async (author, message, imgDate) => {
    const res = await fetch(`http://localhost:3004/comments/${imgDate}`);
    if (res.status === 404) {
      const objectToPush = {
        comments: [
          {
            author,
            message
          }
        ],
        imgDate
      };
      await fetch(`http://localhost:3004/comments`, {
        method: "POST",
        body: JSON.stringify(objectToPush),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else if (res.status === 200) {
      const data = await res.json();
      const objectToPush = {
        ...data,
        comments: data.comments.concat({ author, message })
      };
      await fetch(`http://localhost:3004/comments/${imgDate}`, {
        method: "PUT",
        body: JSON.stringify(objectToPush),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };

  async fetchImages(arrayOfDates) {
    const promises = arrayOfDates.map(date => {
      const url = `https://api.nasa.gov/planetary/apod?api_key=XOVbZ8gIyfZTNb0PJgmggUPqwgQVM319jG35pZjg&date=${date}`;
      return fetch(url).then(res => res.json());
    });

    // https://api.nasa.gov/planetary/apod\?api_key\=XOVbZ8gIyfZTNb0PJgmggUPqwgQVM319jG35pZjg\&start_date\=2019-11-11\&end_date\=2019-11-15

    const data = await Promise.all(promises);
    console.log(data);
    this.setState({
      images: [
        ...this.state.images,
        ...data
          .map(dailyPicture => {
            return { ...dailyPicture, likes: 0, comments: [] };
          })
          .filter(data => "url" in data)
      ]
    });
  }

  getDates() {
    let start = null;
    if (this.state.images.length == 0) {
      start = moment();
    } else {
      const existingDates = this.state.images.map(image =>
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

  async updateCommentsAndLikes() {
    const resLikes = await fetch("http://localhost:3004/likes");
    const dataLikes = await resLikes.json();
    const resComments = await fetch("http://localhost:3004/comments");
    const dataComments = await resComments.json();
    const oldState = [...this.state.images];
    this.setState({
      images: oldState.map(dailyPicture => {
        const dateArrayLikes = dataLikes.map(like => like["imgDate"]);
        const dateArrayComments = dataComments.map(
          comment => comment["imgDate"]
        );
        const indexLikes = dateArrayLikes.indexOf(dailyPicture["date"]);
        const indexComments = dateArrayComments.indexOf(dailyPicture["date"]);
        const likes =
          indexLikes == -1
            ? dailyPicture.likes
            : dataLikes[indexLikes]["numberOfLikes"];
        const comments =
          indexComments == -1
            ? dailyPicture.comments
            : dailyPicture.comments.concat(
                dataComments[indexComments]["comments"]
              );
        return { ...dailyPicture, likes, comments };
      })
    });
  }
  async fillerAsyncFunction(initialDates) {
    await this.fetchImages(initialDates);
    await this.updateCommentsAndLikes();
  }
  componentDidMount() {
    this.fillerAsyncFunction(this.getDates());
  }
  render() {
    return (
      <div className="App">
        <main>
          <h2 id="mainheader">Gergo &amp; Ksenia Astronomy Feed</h2>
          <section>
            <div id="leftpanel">Left panel</div>
            <div className="feed">
              {this.state.images.map(image => {
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
                      addLike={this.addLike}
                      id={image.date}
                      likes={image.likes}
                      comments={image.comments}
                      saveComment={this.saveComment}
                    />
                  </Element>
                );
              })}
              <button onClick={() => this.fetchImages(this.getDates())}>
                More
              </button>
            </div>
          </section>
          <footer>Made with sweat and tears in Codaisseur</footer>
        </main>
      </div>
    );
  }
}

export default App;
