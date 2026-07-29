import React, { useState } from 'react';
import StarRating from './StarRating';
import './ReviewList.css';

/**
 * ReviewList
 * Shows 2 reviews initially. "More reviews" expands a scrollable list.
 */
export default function ReviewList({ reviews = [], rating, count }) {
  const [expanded, setExpanded] = useState(false);

  const initial  = reviews.slice(0, 2);
  const extra    = reviews.slice(2);
  const hasMore  = extra.length > 0;

  return (
    <section className="review-list">
      <div className="review-list__header">
        <h3>Reviews</h3>
        {rating !== undefined && (
          <div className="review-list__summary">
            <StarRating rating={rating} count={count} large />
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="review-list__empty">No reviews yet — be the first!</p>
      ) : (
        <>
          {/* Always-visible first 2 */}
          <div className="review-list__items">
            {initial.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Expandable extra reviews */}
          {hasMore && (
            <>
              {expanded && (
                <div className="review-list__items review-list__items--scroll">
                  {extra.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
              <button
                type="button"
                className="review-list__toggle"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded
                  ? 'Hide extra reviews'
                  : `More reviews (${extra.length} more)`}
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-card__top">
        <span className="review-card__author">{review.author}</span>
        <StarRating rating={review.rating} />
        <time className="review-card__date">
          {new Date(review.date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </time>
      </div>
      <p className="review-card__body">{review.body}</p>
    </article>
  );
}
