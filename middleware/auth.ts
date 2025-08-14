export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useCartStore();
  
  const protectedRoutes = ['/cart'];
  
  if (protectedRoutes.includes(to.path) && !isAuthenticated) {
    return navigateTo(`/login?redirect=${to.path}`);
  }
});