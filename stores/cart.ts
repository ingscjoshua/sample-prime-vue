import { defineStore } from 'pinia';
import type { Product } from '~/models/product';
import type { CartItem } from '~/models/cart';
import type { User } from '~/models/user';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    user: null as User | null,
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    isAuthenticated: (state) => !!state.user,
  },
  
  actions: {
    addItem(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveToSession();
      
      // Toast notification is handled in the component that calls this method
    },
    
    removeItem(productId: number) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToSession();
        
        // Toast notification is handled in the component that calls this method
      }
    },
    
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToSession();
      }
    },
    
    clearCart() {
      this.items = [];
      this.saveToSession();
      
      // Toast notification is handled in the component that calls this method
    },
    
    setUser(user: User) {
      this.user = user;
      this.saveToSession();
    },
    
    logout() {
      this.user = null;
      this.saveToSession();
    },
    
    saveToSession() {
      if (process.client) {
        const data = {
          items: this.items,
          user: this.user,
          timestamp: Date.now()
        };
        sessionStorage.setItem('cart', JSON.stringify(data));
      }
    },
    
    loadFromSession() {
      if (process.client) {
        const stored = sessionStorage.getItem('cart');
        if (stored) {
          const data = JSON.parse(stored);
          // Check if data is not older than 24 hours
          const isExpired = data.timestamp && (Date.now() - data.timestamp > 24 * 60 * 60 * 1000);
          if (!isExpired) {
            this.items = data.items || [];
            this.user = data.user || null;
          } else {
            sessionStorage.removeItem('cart');
          }
        }
      }
    }
  }
});