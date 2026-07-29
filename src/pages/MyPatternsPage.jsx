import React from 'react';
import { useApp } from '../context/AppContext';

export default function MyPatternsPage() {
  const { handleHover, handleClick, setActiveTab } = useApp();

  return (
    <div className="my-patterns-page">
      <div className="my-patterns__hero">
        <h1>My Patterns</h1>
        <p className="shop__subtitle">
          Your purchased patterns will live here, ready to open any time.
        </p>
      </div>

      <div className="my-patterns__empty">
        <div className="my-patterns__empty-icon">📂</div>
        <h2>No patterns yet</h2>
        <p>
          You haven't purchased any patterns yet.{' '}
          <br />
          Payment functionality is coming soon — once it's set up, every pattern
          you buy will appear here in your chosen version.
        </p>

        <div className="my-patterns__versions">
          <p className="my-patterns__versions-label">Available versions with every pattern:</p>
          <div className="my-patterns__version-chips">
            <span className="my-patterns__chip my-patterns__chip--easyflow">
              🌿 Easyflow
            </span>
            <span className="my-patterns__chip my-patterns__chip--compact">
              📐 Compact
            </span>
            <span className="my-patterns__chip my-patterns__chip--pictures">
              🖼 Pictures
            </span>
          </div>
          <p className="my-patterns__versions-note">
            Each version is the same pattern — just presented differently so it suits how you like to knit.
          </p>
        </div>

        <button
          className="button button--primary"
          type="button"
          onMouseEnter={handleHover}
          onClick={() => { handleClick(); setActiveTab('pattern'); }}
        >
          Browse Patterns
        </button>
      </div>
    </div>
  );
}
