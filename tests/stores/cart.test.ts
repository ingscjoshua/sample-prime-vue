import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/models/product';
import type { User } from '~/models/user';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Mock sessionStorage
    global.sessionStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
  });

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'Test description',
    category: 'electronics',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 100 },
  };

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    name: { firstname: 'Test', lastname: 'User' },
    phone: '1234567890',
    token: 'test-token',
  };

  describe('addItem', () => {
    it('should add a new item to cart', () => {
      const store = useCartStore();
      store.addItem(mockProduct);

      expect(store.items).toHaveLength(1);
      expect(store.items[0].id).toBe(mockProduct.id);
      expect(store.items[0].quantity).toBe(1);
    });

    it('should increment quantity if item already exists', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.addItem(mockProduct);

      expect(store.items).toHaveLength(1);
      expect(store.items[0].quantity).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.removeItem(mockProduct.id);

      expect(store.items).toHaveLength(0);
    });

    it('should do nothing if item does not exist', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.removeItem(999);

      expect(store.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.updateQuantity(mockProduct.id, 5);

      expect(store.items[0].quantity).toBe(5);
    });

    it('should do nothing if item does not exist', () => {
      const store = useCartStore();
      store.updateQuantity(999, 5);

      expect(store.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.addItem({ ...mockProduct, id: 2 });
      store.clearCart();

      expect(store.items).toHaveLength(0);
    });
  });

  describe('getters', () => {
    it('should calculate totalItems correctly', () => {
      const store = useCartStore();
      store.addItem(mockProduct);
      store.addItem(mockProduct);
      store.addItem({ ...mockProduct, id: 2 });

      expect(store.totalItems).toBe(3);
    });

    it('should calculate totalPrice correctly', () => {
      const store = useCartStore();
      store.addItem(mockProduct); // 29.99
      store.addItem(mockProduct); // 29.99
      store.addItem({ ...mockProduct, id: 2, price: 10 }); // 10

      expect(store.totalPrice).toBeCloseTo(69.98, 2);
    });

    it('should return isAuthenticated as false when no user', () => {
      const store = useCartStore();
      expect(store.isAuthenticated).toBe(false);
    });

    it('should return isAuthenticated as true when user exists', () => {
      const store = useCartStore();
      store.setUser(mockUser);
      expect(store.isAuthenticated).toBe(true);
    });
  });

  describe('user management', () => {
    it('should set user', () => {
      const store = useCartStore();
      store.setUser(mockUser);

      expect(store.user).toEqual(mockUser);
      expect(store.isAuthenticated).toBe(true);
    });

    it('should logout user', () => {
      const store = useCartStore();
      store.setUser(mockUser);
      store.logout();

      expect(store.user).toBeNull();
      expect(store.isAuthenticated).toBe(false);
    });
  });
});
