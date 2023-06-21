import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likedTweets, setLikedTweets] = useState([]);

  useEffect(() => {
    fetch('http://www.mocky.io/v2/5d1ef97d310000552febe99d')
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Twitter Timeline</h1>
      <div className="flex mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 mr-2 border border-gray-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 mr-2 border border-gray-400"
        />
        <button
          onClick={handleDateFilter}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>
      {filteredTweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
        <ul className="space-y-4">
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
