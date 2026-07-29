import React from 'react';
import StarRating from './StarRating';
import { useApp } from '../context/AppContext';
import './PatternCard.css';

/**
 * PatternCard
 * Grid card for a single pattern. Clicking the card opens the detail view.
 * @param {object}   pattern        - pattern data object
 * @param {function} onSelect       - called with pattern.id when card is clicked
 */
export default function PatternCard({ pattern, onSelect }) {
  const { isFavourite, toggleFavourite, handleClick } = useApp();
  const fav = isFavourite(pattern.id);

  const handleCardClick = () => {
    handleClick();
    onSelect?.(pattern.id);
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    toggleFavourite(pattern);
  };

  return (
    <article
      className={`pcard${fav ? ' pcard--favourited' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`View ${pattern.title}`}
    >
      <div className="pcard__img-wrap">
        <img
          className="pcard__img"
          src={pattern.featuredImage || pattern.image}
          alt={pattern.title}
          loading="lazy"
        />
        <div className="pcard__badges">
          {pattern.priceAmount ? (
            <span className="pcard__badge pcard__badge--paid">
              {pattern.originalPrice && (
                <s>£{pattern.originalPrice.toFixed(2)}</s>
              )}
              £{pattern.priceAmount.toFixed(2)}
            </span>
          ) : (
            <span className="pcard__badge pcard__badge--free">Free</span>
          )}
          <span className="pcard__badge">{pattern.difficulty}</span>
        </div>
        <button
          type="button"
          className={`pcard__fav${fav ? ' pcard__fav--active' : ''}`}
          onClick={handleFavClick}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>
      <div className="pcard__body">
        <p className="pcard__designer">{pattern.designer}</p>
        <h3 className="pcard__title">{pattern.title}</h3>
        <p className="pcard__desc">{pattern.description}</p>
        <div className="pcard__meta">
          <span>{pattern.yarnWeight}</span>
          <span>{pattern.needleSize}</span>
          <span>{pattern.estimatedTime}</span>
        </div>
        <div className="pcard__footer">
          <StarRating rating={pattern.rating} count={pattern.reviewCount} />
          <span className="pcard__cta">View pattern →</span>
        </div>
      </div>
    </article>
  );
}
