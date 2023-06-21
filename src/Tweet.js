import React from 'react';

const Tweet = ({ tweet, handleLike, isLiked }) => {
  const { _id, url, text, imageUrl, publishedDate } = tweet;

  const handleLikeClick = () => {
    handleLike(_id);
  };

  return (
    <li className="border p-4">
      <p>{text}</p>
      {imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Tweet" className="w-32 h-auto" />
        </div>
      )}
      <div className="flex items-center mt-2">
        <button
          onClick={handleLikeClick}
          className={`p-2 bg-blue-500 text-white rounded ${
            isLiked ? 'bg-gray-500' : ''
          }`}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-500 text-white rounded ml-2"
        >
          Go to original tweet
        </a>
      </div>
      <p className="mt-2 text-sm text-gray-500">{publishedDate}</p>
    </li>
  );
};

export default Tweet;
