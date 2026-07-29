import React, { useState } from 'react';
import { shopProducts } from '../data/catalogue';
import { useApp } from '../context/AppContext';

const SHOP_CATEGORIES = ['All', 'Yarn', 'Knitting Needles', 'Crochet Hooks', 'Patterns', 'Accessories', 'Kits'];

export default function ShopPage() {
  const { basket, addToBasket, setActiveTab, handleClick, handleHover } = useApp();

  const [search, setSearch]           = useState('');
  const [category, setCategory]       = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = shopProducts.filter((p) => {
    const matchesCat = category === 'All' || p.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const basketCount = basket.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="shop-page">
      <div className="shop__header">
        <div>
          <h1>Shop</h1>
          <p className="shop__subtitle">Browse cosy essentials, delightful tools, and fresh patterns.</p>
        </div>
        <button
          className="shop__basket"
          aria-label={`View basket with ${basketCount} items`}
          type="button"
          onMouseEnter={handleHover}
          onClick={() => { handleClick(); setActiveTab('basket'); }}
        >
          <span className="shop__basket-icon">🛍️</span>
          <span className="shop__basket-count">{basketCount}</span>
        </button>
      </div>

      <div className="shop__toolbar">
        <label className="shop__search">
          <span className="shop__search-icon">🔎</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
          />
        </label>
        <button
          className="pattern__toggle"
          type="button"
          onMouseEnter={handleHover}
          onClick={() => { handleClick(); setShowFilters((v) => !v); }}
        >
          {showFilters ? 'Hide filter options' : 'Show filter options'}
        </button>
        {showFilters && (
          <div className="shop__filters">
            {SHOP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'shop__filter shop__filter--active' : 'shop__filter'}
                onMouseEnter={handleHover}
                onClick={() => setCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="shop__grid">
        {filtered.map((product) => {
          const basketQty = basket.find((i) => i.id === product.id)?.quantity || 0;
          return (
            <article className="shop-card" key={product.id}>
              <div className="shop-card__image-wrap">
                <img className="shop-card__image" src={product.image} alt={product.name} />
              </div>
              <div className="shop-card__body">
                <div className="shop-card__meta">
                  <span className="shop-card__category">{product.category}</span>
                  <span className="shop-card__stock">{product.stock}</span>
                </div>
                <h3>{product.name}</h3>
                <div className="shop-card__rating">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </div>
                <div className="shop-card__footer">
                  <span className="shop-card__price">£{product.price.toFixed(2)}</span>
                  <div className="shop-card__actions">
                    <button className="shop-card__button shop-card__button--ghost" type="button" onMouseEnter={handleHover}>
                      View Details
                    </button>
                    <div className="shop-card__add-row">
                      <button
                        className="shop-card__button"
                        type="button"
                        onMouseEnter={handleHover}
                        onClick={() => addToBasket(product)}
                      >
                        Add to Basket
                      </button>
                      {basketQty > 0 && (
                        <span className="shop-card__basket-badge">+{basketQty}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
