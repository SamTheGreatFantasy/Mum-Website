import React, { useEffect } from 'react';
import Gallery from './Gallery';
import StarRating from './StarRating';
import ReviewList from './ReviewList';
import { useApp } from '../context/AppContext';
import './PatternDetail.css';

/**
 * PatternDetail
 * Full detail view for a single pattern.
 * @param {object}   pattern   - full pattern data object
 * @param {function} onBack    - called when the user navigates back to grid
 */
export default function PatternDetail({ pattern, onBack }) {
  const {
    isFavourite, toggleFavourite,
    addToBasket, basket,
    addToRecentlyViewed,
    handleClick, handleHover,
    setActiveTab,
  } = useApp();

  const fav = isFavourite(pattern.id);
  const basketItem = basket.find((i) => i.id === pattern.id);
  const basketQty = basketItem?.quantity || 0;

  useEffect(() => {
    addToRecentlyViewed(pattern.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pattern.id]);

  const handleAddToBasket = () => {
    handleClick();
    addToBasket({
      id: pattern.id,
      name: pattern.title,
      price: pattern.priceAmount || 0,
      originalPrice: pattern.originalPrice || null,
      image: pattern.featuredImage,
      category: pattern.category,
      stock: 'Digital download',
    });
  };

  const difficultyColour = {
    Beginner: 'detail-badge--beginner',
    Intermediate: 'detail-badge--intermediate',
    Advanced: 'detail-badge--advanced',
  }[pattern.difficulty] || '';

  return (
    <div className="pattern-detail">
      {/* ─── Back navigation ─────────────────────────────────────── */}
      <button type="button" className="detail-back" onClick={() => { handleClick(); onBack(); }}>
        ← Back to patterns
      </button>

      {/* ─── Two-column hero ─────────────────────────────────────── */}
      <div className="detail-hero">
        <Gallery images={pattern.galleryImages || [pattern.featuredImage]} alt={pattern.title} />

        <div className="detail-hero__info">
          <div className="detail-hero__badges">
            <span className={`detail-badge ${difficultyColour}`}>{pattern.difficulty}</span>
            <span className="detail-badge">{pattern.category}</span>
            {pattern.priceAmount ? (
              <span className="detail-badge detail-badge--paid">
                {pattern.originalPrice && (
                  <s style={{ opacity: 0.6, marginRight: '0.25em', fontWeight: 400 }}>
                    £{pattern.originalPrice.toFixed(2)}
                  </s>
                )}
                £{pattern.priceAmount.toFixed(2)}
              </span>
            ) : (
              <span className="detail-badge detail-badge--free">Free</span>
            )}
          </div>

          <h1 className="detail-title">{pattern.title}</h1>
          <p className="detail-designer">by {pattern.designer}</p>

          <StarRating rating={pattern.rating} count={pattern.reviewCount} large />

          <p className="detail-description">{pattern.description}</p>

          {/* ─── Specs grid ──────────────────────────────────────── */}
          <dl className="detail-specs">
            <div className="detail-spec">
              <dt>Yarn weight</dt><dd>{pattern.yarnWeight}</dd>
            </div>
            <div className="detail-spec">
              <dt>Needle size</dt><dd>{pattern.needleSize}</dd>
            </div>
            <div className="detail-spec">
              <dt>Approx. size</dt>
              <dd>
                {pattern.finishedMeasurements
                  ? Object.entries(pattern.finishedMeasurements)
                      .slice(0, 2)
                      .map(([k, v]) => v)
                      .join(' × ')
                  : '—'}
              </dd>
            </div>
            <div className="detail-spec">
              <dt>Est. time</dt><dd>{pattern.estimatedTime}</dd>
            </div>
          </dl>

          {/* ─── Actions ─────────────────────────────────────────── */}
          <div className="detail-actions">
            {pattern.priceAmount ? (
              <div className="detail-actions__basket-row">
                <button
                  type="button"
                  className="button button--primary"
                  onMouseEnter={handleHover}
                  onClick={handleAddToBasket}
                >
                  Add to Basket — £{pattern.priceAmount.toFixed(2)}
                </button>
                {basketQty > 0 && (
                  <span className="shop-card__basket-badge">+{basketQty}</span>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="button button--primary detail-actions__download"
                onMouseEnter={handleHover}
                onClick={() => { handleClick(); window.open(pattern.downloadLink, '_blank'); }}
              >
                Download Free Pattern
              </button>
            )}

            <button
              type="button"
              className={`button detail-actions__fav${fav ? ' detail-actions__fav--active' : ''}`}
              onMouseEnter={handleHover}
              onClick={() => { handleClick(); toggleFavourite(pattern); }}
              aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
            >
              {fav ? '♥ Saved' : '♡ Save to Favourites'}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Tags ────────────────────────────────────────────────── */}
      {pattern.tags?.length > 0 && (
        <div className="detail-tags">
          {pattern.tags.map((tag) => (
            <span key={tag} className="detail-tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* ─── Reviews ─────────────────────────────────────────────── */}
      <section className="detail-section">
        <ReviewList
          reviews={pattern.reviews || []}
          rating={pattern.rating}
          count={pattern.reviewCount}
        />
      </section>
    </div>
  );
}
