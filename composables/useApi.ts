export const useApi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    
    try {
      return await apiCall();
    } catch (err: any) {
      error.value = err.message || 'An error occurred';
      return null;
    } finally {
      loading.value = false;
    }
  };
  
  return { loading: readonly(loading), error: readonly(error), execute };
};