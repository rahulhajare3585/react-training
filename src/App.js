import "./App.css";
import React, { Component, createRef } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  setProgress = (progress) => {
    if (this.ref.current) {
      this.ref.current.continuousStart();
      this.ref.current.complete();
    }
  };

  render() {
    const pageSize = 8;
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" ref={this.ref} shadow={true} height={5} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="general"
                  key="general"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="sports"
                  key="sports"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="business"
                  key="business"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="entertainment"
                  key="entertainment"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="health"
                  key="health"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="science"
                  key="science"
                  country="us"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={pageSize}
                  category="technology"
                  key="technology"
                  country="us"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}