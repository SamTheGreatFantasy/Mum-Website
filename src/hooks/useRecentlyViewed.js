import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    'knitting-recently-viewed',
    []
  );

  const addToRecentlyViewed = (patternId) => {
    setRecentlyViewed((current) => {
      const filtered = current.filter((id) => id !== patternId);
      return [patternId, ...filtered].slice(0, MAX_RECENT);
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
}
