import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PatternDetail from '../components/PatternDetail';
import { getPatternById } from '../services/patternService';

export default function FavouritesPage() {
  const { favourites, toggleFavourite, handleHover, handleClick, setActiveTab } = useApp();
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('recent');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = favourites
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.difficulty.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === 'az')         return a.name.localeCompare(b.name);
      if (sort === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
      return new Date(b.addedAt) - new Date(a.addedAt);
    });

  // ── Pattern detail view ──────────────────────────────────────────────
  if (selectedId) {
    const pattern = getPatternById(selectedId);
    if (pattern) {
      return (
        <PatternDetail
          pattern={pattern}
          onBack={() => setSelectedId(null)}
        />
      );
    }
  }

  return (
    <div className="favourites-page">
      <div className="favourites__header">
        <div>
          <h1>Favourites</h1>
          <p className="shop__subtitle">Your favourite patterns, all in one cosy collection.</p>
        </div>
        <div className="favourites__controls">
          <label className="shop__search favourites__search">
            <span className="shop__search-icon">🔎</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search favourites"
            />
          </label>
          <div className="favourites__sort">
            {[['recent','Recently Added'],['az','A–Z'],['difficulty','Difficulty']].map(([val,label]) => (
              <button
                key={val}
                className={sort === val ? 'shop__filter shop__filter--active' : 'shop__filter'}
                type="button"
                onMouseEnter={handleHover}
                onClick={() => setSort(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="favourites__empty">
          <div className="favourites__empty-illustration">🧶</div>
          <h2>{favourites.length === 0 ? 'No favourites yet' : 'No matches'}</h2>
          <p>
            {favourites.length === 0
              ? 'Add patterns from the dashboard to keep your next project close at hand.'
              : 'Try a different search term.'}
          </p>
          {favourites.length === 0 && (
            <button
              className="button button--primary"
              type="button"
              onMouseEnter={handleHover}
              onClick={() => { handleClick(); setActiveTab('pattern'); }}
            >
              Browse Patterns
            </button>
          )}
        </div>
      ) : (
        <div className="favourites__grid">
          {filtered.map((pattern) => (
            <article className="favourites-card" key={pattern.id}>
              <img className="favourites-card__image" src={pattern.image} alt={pattern.name} />
              <div className="favourites-card__body">
                <div className="favourites-card__meta">
                  <span className="shop-card__category">{pattern.difficulty}</span>
                  <span className="shop-card__stock">{pattern.yarnWeight}</span>
                </div>
                <h3>{pattern.name}</h3>
                <p>{pattern.description}</p>
                <div className="favourites-card__actions">
                  <button
                    className="shop-card__button"
                    type="button"
                    onMouseEnter={handleHover}
                    onClick={() => { handleClick(); setSelectedId(pattern.id); }}
                  >
                    View Pattern
                  </button>
                  <button
                    className="shop-card__button shop-card__button--ghost"
                    type="button"
                    onMouseEnter={handleHover}
                    onClick={() => { handleClick(); toggleFavourite(pattern); }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
