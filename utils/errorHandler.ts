export const handleApiError = (error: any): string => {
  if (error.response?.status === 401) {
    navigateTo('/login');
    return 'Authentication required';
  }
  if (error.response?.status === 404) {
    return 'Resource not found';
  }
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later';
  }
  return error.message || 'An unexpected error occurred';
};