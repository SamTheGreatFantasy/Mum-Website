import React, { useState, useMemo } from 'react';
import PatternCard from '../components/PatternCard';
import FilterBar from '../components/FilterBar';
import PatternDetail from '../components/PatternDetail';
import { filterPatterns, getFilterOptions, getPatternById } from '../services/patternService';
import { useApp } from '../context/AppContext';
import './PatternDashboardPage.css';

export default function PatternDashboardPage() {
  const { recentlyViewed, handleClick, handleHover, setActiveTab } = useApp();

  // ─── Filter / sort state ────────────────────────────────────────────
  const [search, setSearch]           = useState('');
  const [difficulty, setDifficulty]   = useState('All');
  const [category, setCategory]       = useState('All');
  const [yarnWeight, setYarnWeight]   = useState('All');
  const [price, setPrice]             = useState('All');
  const [sort, setSort]               = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // ─── Detail view ────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState(null);

  const options = useMemo(() => getFilterOptions(), []);

  const patterns = useMemo(
    () => filterPatterns({ search, difficulty, category, yarnWeight, price, sort }),
    [search, difficulty, category, yarnWeight, price, sort]
  );

  const selectedPattern = selectedId ? getPatternById(selectedId) : null;

  if (selectedPattern) {
    return (
      <PatternDetail
        pattern={selectedPattern}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const recentPatterns = recentlyViewed
    .map((id) => getPatternById(id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="pdash">
      <div className="pdash__hero">
        <div>
          <h1>Pattern Dashboard</h1>
          <p className="pdash__subtitle">
            Discover beautiful knitting projects — from beginner beanies to advanced lace shawls.
          </p>
          <p className="pdash__count">{patterns.length} pattern{patterns.length !== 1 ? 's' : ''} available</p>
        </div>
        <div className="pdash__hero-actions">
          <button
            className="button button--secondary pdash__my-patterns-btn"
            type="button"
            onMouseEnter={handleHover}
            onClick={() => { handleClick(); setActiveTab('mypatterns'); }}
          >
            📂 My Patterns
          </button>
        </div>
      </div>

      <FilterBar
        search={search}           onSearchChange={setSearch}
        difficulty={difficulty}   onDifficultyChange={setDifficulty}
        category={category}       onCategoryChange={setCategory}
        yarnWeight={yarnWeight}   onYarnWeightChange={setYarnWeight}
        price={price}             onPriceChange={setPrice}
        sort={sort}               onSortChange={setSort}
        options={options}
        resultCount={patterns.length}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
      />

      {patterns.length === 0 ? (
        <div className="pdash__empty">
          <div className="pdash__empty-icon">🧶</div>
          <h2>No patterns found</h2>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="pdash__grid">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} onSelect={setSelectedId} />
          ))}
        </div>
      )}

      {recentPatterns.length > 0 && (
        <section className="pdash__recent">
          <h2>Recently viewed</h2>
          <div className="pdash__recent-grid">
            {recentPatterns.map((p) => (
              <PatternCard key={p.id} pattern={p} onSelect={setSelectedId} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
