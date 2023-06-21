import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likedTweets, setLikedTweets] = useState([]);

  useEffect(() => {
    fetch('https://www.mocky.io/v2/5d1ef97d310000552febe99d')
      .then((response) => response.json())
      .then((data) => {
        setTweets(data);
        setFilteredTweets(data);
      })
      .catch((error) => {
        console.error('Error fetching tweets:', error);
      });
  }, []);

  const handleDateFilter = () => {
    setFilteredTweets(
      tweets.filter((tweet) => {
        const tweetDate = new Date(tweet.publishedDate);
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);
        return tweetDate >= filterStartDate && tweetDate <= filterEndDate;
      })
    );
  };

  const handleLike = (tweetId) => {
    const likedTweetIds = likedTweets.map((tweet) => tweet._id);
    if (likedTweetIds.includes(tweetId)) {
      setLikedTweets(likedTweets.filter((tweet) => tweet._id !== tweetId));
    } else {
      const likedTweet = tweets.find((tweet) => tweet._id === tweetId);
      setLikedTweets([...likedTweets, likedTweet]);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-4">Twitter Timeline</h1>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-3">
            <button
              onClick={handleDateFilter}
              className="btn btn-primary mb-2"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      {filteredTweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
        <ul className="list-group">
          {filteredTweets.map((tweet) => (
            <Tweet
              key={tweet._id}
              tweet={tweet}
              handleLike={handleLike}
              isLiked={likedTweets.some((likedTweet) => likedTweet._id === tweet._id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
