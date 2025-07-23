import { useCartStore } from '~/stores/cart';

export default defineNuxtPlugin(({ $pinia }) => {
  // Wait for client-side to access sessionStorage
  if (process.client) {
    const cartStore = useCartStore($pinia);
    cartStore.loadFromSession();
  }
});