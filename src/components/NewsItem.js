import React, { Component } from "react";

export class NewsItem extends Component {
  // constructor() {
  //     super();

  // }
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>

        <div className="card" style={{ width: "18rem" }}>
        <span className="d-flex badge rounded-pill bg-danger" style={{position: "absolute", zIndex: "1", right: "0", top: "0"}}>
                {source}
              </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title.slice(0, 40)}...{" "}
              
            </h5>
            <p className="card-text">{description.slice(0, 88)}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "unknown" : author} on
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
