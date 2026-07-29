import React from 'react';
import './StarRating.css';

/**
 * StarRating
 * @param {number} rating  - numeric rating 0–5
 * @param {number} count   - review count (optional)
 * @param {boolean} large  - render at larger size
 */
export default function StarRating({ rating = 0, count, large = false }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className={`star-rating${large ? ' star-rating--large' : ''}`} aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      {count !== undefined && (
        <span className="star-rating__count">({count})</span>
      )}
    </span>
  );
}
