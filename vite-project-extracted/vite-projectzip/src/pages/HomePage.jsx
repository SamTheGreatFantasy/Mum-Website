import React from 'react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { setPage, handleClick } = useApp();

  return (
    <div className="home">
      <div className="home__overlay">
        <div className="home__badges">
          <span className="home__pill">Cosy patterns</span>
          <span className="home__pill">Handmade charm</span>
          <span className="home__pill">Warm studio</span>
        </div>
        <h1 className="home__title">
          <span className="home__flower">❀</span>
          My Knitting App
          <span className="home__flower">❀</span>
        </h1>
        <p className="home__subtitle">
          Welcome to your knitting space. Explore patterns, favourites, and more with a warm, woven feel.
        </p>
        <div className="home__cta-row">
          <button
            className="home__continue"
            onClick={() => { handleClick(); setPage('dashboard'); }}
          >
            Continue
          </button>
          <span className="home__support">A little place for your next lovely knit.</span>
        </div>
      </div>
    </div>
  );
}
