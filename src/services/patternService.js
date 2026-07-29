/**
 * Pattern Service
 *
 * Automatically loads every pattern from src/patterns/[slug]/data.json
 * using Vite's import.meta.glob. To add a new pattern, simply create a
 * new folder under src/patterns/ with a data.json and an images/ directory.
 *
 * When you later connect to a real API or database, replace getAllPatterns()
 * with an async fetch — all consumers already call this service, so no
 * other files need to change.
 */

const patternModules = import.meta.glob('../patterns/*/data.json', { eager: true });

let _allPatterns = null;

export function getAllPatterns() {
  if (_allPatterns) return _allPatterns;
  _allPatterns = Object.entries(patternModules)
    .map(([path, mod]) => {
      const data = { ...(mod.default || mod) };
      // Derive id from folder name if missing
      if (!data.id) {
        const match = path.match(/\/patterns\/([^/]+)\/data\.json$/);
        data.id = match ? match[1] : path;
      }
      return data;
    })
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  return _allPatterns;
}

export function getPatternById(id) {
  return getAllPatterns().find((p) => p.id === id) ?? null;
}

export function filterPatterns({
  search = '',
  difficulty = 'All',
  category = 'All',
  yarnWeight = 'All',
  price = 'All',
  sort = 'popular',
} = {}) {
  let result = getAllPatterns();

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.designer?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  if (difficulty !== 'All') result = result.filter((p) => p.difficulty === difficulty);
  if (category !== 'All') result = result.filter((p) => p.category === category);
  if (yarnWeight !== 'All') result = result.filter((p) => p.yarnWeight === yarnWeight);
  if (price !== 'All') {
    result = result.filter((p) =>
      price === 'Free' ? !p.priceAmount : !!p.priceAmount
    );
  }

  switch (sort) {
    case 'az':
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return [...result].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    case 'rating':
      return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default: // popular
      return [...result].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
}

export function getFilterOptions() {
  const patterns = getAllPatterns();
  return {
    difficulties: ['All', ...new Set(patterns.map((p) => p.difficulty).filter(Boolean))],
    categories: ['All', ...new Set(patterns.map((p) => p.category).filter(Boolean))],
    yarnWeights: ['All', ...new Set(patterns.map((p) => p.yarnWeight).filter(Boolean))],
    prices: ['All', 'Free', 'Paid'],
  };
}
