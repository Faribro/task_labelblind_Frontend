import React from 'react';

const Tweet = ({ tweet, handleLike, isLiked }) => {
  const { _id, url, text, imageUrl, publishedDate } = tweet;

  const handleLikeClick = () => {
    handleLike(_id);
  };

  return (
    <li className="list-group-item">
      <p>{text}</p>
      {imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Tweet" className="w-100" />
        </div>
      )}
      <div className="d-flex align-items-center mt-2">
        <button
          onClick={handleLikeClick}
          className={`btn btn-primary btn-sm ${isLiked ? 'disabled' : ''}`}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm ml-2"
        >
          Go to original tweet
        </a>
      </div>
      <p className="mt-2 text-muted">{publishedDate}</p>
    </li>
  );
};

export default Tweet;
