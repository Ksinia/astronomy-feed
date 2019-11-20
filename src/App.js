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
  addLike = index => {
    let img = this.state.images.slice();
    img[index].likes += 1;
    this.setState({
      ...this.state,
      images: img
    });
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
        ...data.map(dailyPicture => {
          return { ...dailyPicture, likes: 0, comments: [] };
        })
      ]
    });
  }
  async updateCommentsAndLikes() {
    const res = await fetch("http://localhost:3004/images")
    const data = await res.json()
    const oldState = [...this.state.images]
    this.setState({
      images: oldState.map(dailyPicture => {
        const dateArray = data.map(comment => comment['imgDate'])
        const index = dateArray.indexOf(dailyPicture['date'])
        // console.log('comments in the state:', dailyPicture.comments)
        // console.log('the current comment', data[index]['comments'])
        // console.log('concat strings', dailyPicture.comments.concat(data[index]['comments']))
        const likes = (index == -1) ? dailyPicture.likes : data[index]['numberOfLikes']
        const comments = (index == -1) ? dailyPicture.comments : dailyPicture.comments.concat(data[index]['comments'])
        return { ...dailyPicture, likes, comments }
      })
    })
  }
  async fillerAsyncFunction(initialDates) {
    await this.fetchImages(initialDates);
    await this.updateCommentsAndLikes()
  }
  componentDidMount() {
    const initialDates = Array(5)
      .fill(null)
      .map((date, index) => {
        return moment()
          .subtract(index, "days")
          .format("YYYY-MM-DD");
      });
    this.fillerAsyncFunction(initialDates)
  }
  render() {
    return (
      <div className="App">
        <main>
          <h2 id="mainheader">Gergo &amp; Ksenia Astronomy Feed</h2>
          <section>
            <div id="leftpanel">Left panel</div>
            <div className="feed">
              {this.state.images.map((image, index) => {
                return (
                  <Element
                    key={image.date}
                    imgsrc={
                      image.media_type === "image"
                        ? image.url
                        : "https://s23527.pcdn.co/wp-content/uploads/2017/04/nasa-gallery.jpg.optimal.jpg"
                    }
                    title={image.title}
                    date={image.date}
                    description={image.explanation}
                  >
                    <LikeAndComment
                      onClick={() => this.addLike(index)}
                      likes={image.likes}
                    />
                  </Element>
                );
              })}
            </div>
          </section>
          <footer>Some footer</footer>
        </main>
      </div>
    );
  }
}

export default App;
