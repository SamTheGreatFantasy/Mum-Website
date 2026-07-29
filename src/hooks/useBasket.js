import { useLocalStorage } from './useLocalStorage';

export function useBasket() {
  const [basket, setBasket] = useLocalStorage('knitting-basket', []);

  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  const addToBasket = (product) => {
    setBasket((current) => {
      const existing = current.find((i) => i.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name || product.title,
          price: product.price || product.priceAmount || 0,
          image: product.image || product.featuredImage || '',
          category: product.category || '',
          stock: product.stock || 'In stock',
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id, delta) => {
    setBasket((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        const next = item.quantity + delta;
        return next > 0 ? [{ ...item, quantity: next }] : [];
      })
    );
  };

  const removeFromBasket = (id) => {
    setBasket((current) => current.filter((i) => i.id !== id));
  };

  const clearBasket = () => setBasket([]);

  return { basket, basketCount, addToBasket, updateQuantity, removeFromBasket, clearBasket };
}
