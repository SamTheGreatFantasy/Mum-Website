import { useLocalStorage } from './useLocalStorage';

export function useFavourites() {
  const [favourites, setFavourites] = useLocalStorage('knitting-favourites', []);

  const isFavourite = (id) => favourites.some((f) => f.id === id);

  const toggleFavourite = (item) => {
    const id = typeof item === 'object' ? item.id : item;
    setFavourites((current) => {
      if (current.some((f) => f.id === id)) {
        return current.filter((f) => f.id !== id);
      }
      if (typeof item !== 'object') return current;
      const entry = {
        id: item.id,
        name: item.title || item.name || '',
        difficulty: item.difficulty || 'Varied',
        yarnWeight: item.yarnWeight || 'Mixed',
        description: item.description || '',
        image: item.featuredImage || item.image || '',
        addedAt: new Date().toISOString(),
      };
      return [entry, ...current];
    });
  };

  return { favourites, setFavourites, isFavourite, toggleFavourite };
}
