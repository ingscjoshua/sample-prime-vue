import { useCartStore } from '~/stores/cart';

export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on server-side
  if (process.server) return;
  
  const cartStore = useCartStore();
  
  // If user is not authenticated and trying to access protected routes
  if (!cartStore.isAuthenticated && 
      (to.path === '/cart' || to.path.startsWith('/checkout'))) {
    // Redirect to login page with return URL
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
});