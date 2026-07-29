import React from 'react';
import './FilterBar.css';

/**
 * FilterBar
 * Search input + collapsible filters + sort buttons for the pattern dashboard.
 */
export default function FilterBar({
  search, onSearchChange,
  difficulty, onDifficultyChange,
  category, onCategoryChange,
  yarnWeight, onYarnWeightChange,
  price, onPriceChange,
  sort, onSortChange,
  options = {},
  resultCount,
  showFilters, onToggleFilters,
}) {
  const { difficulties = [], categories = [], yarnWeights = [], prices = [] } = options;

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest',  label: 'Newest' },
    { value: 'rating',  label: 'Highest Rated' },
    { value: 'az',      label: 'A–Z' },
  ];

  const hasActiveFilters = (
    difficulty !== 'All' || category !== 'All' ||
    yarnWeight !== 'All' || price !== 'All'
  );

  const clearFilters = () => {
    onDifficultyChange('All');
    onCategoryChange('All');
    onYarnWeightChange('All');
    onPriceChange('All');
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__top">
        <label className="filter-bar__search">
          <span className="filter-bar__search-icon">🔎</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patterns, designers, tags…"
          />
          {search && (
            <button
              type="button"
              className="filter-bar__clear-search"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </label>

        <div className="filter-bar__top-actions">
          <button
            type="button"
            className={`filter-bar__toggle${showFilters ? ' filter-bar__toggle--active' : ''}`}
            onClick={onToggleFilters}
          >
            {showFilters ? 'Hide filters' : 'Filters'}
            {hasActiveFilters && <span className="filter-bar__dot" />}
          </button>
          {hasActiveFilters && (
            <button type="button" className="filter-bar__reset" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="filter-bar__panel">
          <div className="filter-bar__selects">
            <FilterSelect
              label="Difficulty"
              value={difficulty}
              options={difficulties}
              onChange={onDifficultyChange}
            />
            <FilterSelect
              label="Category"
              value={category}
              options={categories}
              onChange={onCategoryChange}
            />
            <FilterSelect
              label="Yarn weight"
              value={yarnWeight}
              options={yarnWeights}
              onChange={onYarnWeightChange}
            />
            <FilterSelect
              label="Price"
              value={price}
              options={prices}
              onChange={onPriceChange}
            />
          </div>
        </div>
      )}

      <div className="filter-bar__sorts">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`filter-bar__sort${sort === opt.value ? ' filter-bar__sort--active' : ''}`}
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
        {resultCount !== undefined && (
          <span className="filter-bar__count">
            {resultCount} pattern{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="filter-bar__field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
