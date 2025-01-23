import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, pageSize, category, setProgress, apiKey }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Set document title
  useEffect(() => {
    document.title = `${category} - News Monkey`;
  }, [category]);

  // Fetch news articles
  const updateNews = async (page) => {
    setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2e026973c64849538c0f84268372dc36&page=${page}&pageSize=${pageSize}`;
    const data = await fetch(url);
    setProgress(20);
    const parsedData = await data.json();
    setProgress(50);
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    updateNews(page);
  }, [page]);

  // Load more articles for infinite scroll
  const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2e026973c64849538c0f84268372dc36&page=${newPage}&pageSize=${pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0" }}>
        {category} - Top Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row d-flex justify-content-center">
          {articles.map((element, index) => (
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2"
              key={index}
            >
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description
                    ? element.description.slice(0, 88)
                    : ""
                }
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default News;