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

  addLike = id => {
    const updatedImages = this.state.images.map(img => {
      if (img.date === id) {
        return { ...img, likes: img.likes + 1 };
      } else {
        return img;
      }
    });
    this.setState({ images: updatedImages });
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

  componentDidMount() {
    this.fetchImages(this.getDates());
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
