import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const VALID_COUPONS = {
  KnittingApp: { label: 'KnittingApp', type: 'percent', value: 20 },
};

const PATTERN_VERSIONS = ['Easyflow', 'Compact', 'Pictures'];

export default function BasketPage() {
  const {
    basket, basketCount,
    updateQuantity, removeFromBasket,
    setActiveTab, handleClick, handleHover,
  } = useApp();

  const [couponInput, setCouponInput]     = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError]     = useState('');
  const [couponOpen, setCouponOpen]       = useState(false);

  // ── Price calculations ───────────────────────────────────────────
  const subtotal = basket.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalSubtotal = basket.reduce((sum, i) => {
    const base = i.originalPrice ?? i.price;
    return sum + base * i.quantity;
  }, 0);

  const priceSavings  = originalSubtotal - subtotal;
  const couponSaving  = appliedCoupon
    ? parseFloat(((appliedCoupon.value / 100) * subtotal).toFixed(2))
    : 0;
  const delivery = subtotal > 0 ? 4.50 : 0;
  const total    = subtotal - couponSaving + delivery;

  // ── Coupon logic ─────────────────────────────────────────────────
  const handleApply = () => {
    const match = VALID_COUPONS[couponInput];
    if (match) {
      setAppliedCoupon(match);
      setCouponError('');
      setCouponInput('');
      setCouponOpen(false);
    } else {
      setCouponError('Invalid coupon code — please check and try again.');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => { setAppliedCoupon(null); setCouponError(''); };

  const hasPatternItems = basket.some((i) => i.stock === 'Digital download');

  return (
    <div className="basket-page">
      <div className="basket__header">
        <div>
          <h1>Your Basket</h1>
          <p className="shop__subtitle">
            {basketCount} item{basketCount === 1 ? '' : 's'} ready for your next cosy project.
          </p>
        </div>
        <button className="button button--secondary" type="button"
          onMouseEnter={handleHover} onClick={() => { handleClick(); setActiveTab('pattern'); }}>
          Browse Patterns
        </button>
      </div>

      {basket.length === 0 ? (
        <div className="basket__empty">
          <div className="basket__empty-illustration">🧺</div>
          <h2>Your basket is empty</h2>
          <p>Browse our collection of beautiful knitting patterns to get started.</p>
          <button className="button button--primary" type="button"
            onMouseEnter={handleHover} onClick={() => { handleClick(); setActiveTab('pattern'); }}>
            Browse Patterns
          </button>
        </div>
      ) : (
        <div className="basket__content">

          {/* ── Item list ──────────────────────────────────────────── */}
          <div className="basket__list">
            {basket.map((item) => (
              <article className="basket-card" key={item.id}>
                <img className="basket-card__image" src={item.image} alt={item.name} />
                <div className="basket-card__body">
                  <div className="basket-card__top">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                    </div>
                    <span className="basket-card__price">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="basket-card__controls">
                    <div className="basket-card__quantity">
                      <button type="button" className="basket-card__quantity-button"
                        onMouseEnter={handleHover} onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" className="basket-card__quantity-button"
                        onMouseEnter={handleHover} onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="basket-card__remove" type="button"
                      onMouseEnter={handleHover} onClick={() => removeFromBasket(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Order summary ───────────────────────────────────────── */}
          <aside className="basket__summary">
            <h2>Order Summary</h2>

            {/* Subtotal at full (original) price */}
            <div className="basket__summary-row">
              <span>Subtotal</span>
              <strong>£{originalSubtotal.toFixed(2)}</strong>
            </div>

            {/* Price-based discount */}
            {priceSavings > 0 && (
              <div className="basket__summary-row basket__summary-row--discount">
                <span>Discount</span>
                <strong>−£{priceSavings.toFixed(2)}</strong>
              </div>
            )}

            {/* Coupon */}
            {appliedCoupon ? (
              <div className="basket__summary-row basket__summary-row--coupon">
                <span className="basket__coupon-applied-label">
                  🏷 {appliedCoupon.label} ({appliedCoupon.value}% off)
                  <button type="button" className="basket__coupon-remove"
                    onClick={removeCoupon} title="Remove coupon">×</button>
                </span>
                <strong className="basket__coupon-saving">−£{couponSaving.toFixed(2)}</strong>
              </div>
            ) : (
              <div className="basket__coupon-section">
                <button
                  type="button"
                  className={`basket__coupon-tab${couponOpen ? ' basket__coupon-tab--open' : ''}`}
                  onClick={() => { setCouponOpen((v) => !v); setCouponError(''); }}
                >
                  🏷 Have a coupon code?
                  <span className="basket__coupon-chevron">{couponOpen ? '▲' : '▼'}</span>
                </button>
                {couponOpen && (
                  <div className="basket__coupon-panel">
                    <div className="basket__coupon-row">
                      <input
                        className="basket__coupon-input"
                        type="text"
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                        autoFocus
                      />
                      <button type="button" className="button button--secondary basket__coupon-apply"
                        onMouseEnter={handleHover} onClick={handleApply}>
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="basket__coupon-error">{couponError}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="basket__summary-row">
              <span>Estimated delivery</span>
              <strong>£{delivery.toFixed(2)}</strong>
            </div>

            <div className="basket__summary-row basket__summary-row--total">
              <span>Total</span>
              <strong>£{total.toFixed(2)}</strong>
            </div>

            {/* Pattern version note */}
            {hasPatternItems && (
              <div className="basket__version-note">
                <p className="basket__version-note__title">📄 Pattern format</p>
                <p className="basket__version-note__body">
                  After purchase, your pattern will appear in{' '}
                  <strong>My Patterns</strong>. Choose your preferred version:
                </p>
                <div className="basket__version-chips">
                  {PATTERN_VERSIONS.map((v) => (
                    <span key={v} className="basket__version-chip">{v}</span>
                  ))}
                </div>
              </div>
            )}

            <button className="button button--primary basket__checkout"
              type="button" onMouseEnter={handleHover}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
