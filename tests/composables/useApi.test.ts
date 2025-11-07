import { describe, it, expect, vi } from 'vitest';
import { useApi } from '~/composables/useApi';

describe('useApi composable', () => {
  it('should execute API call successfully', async () => {
    const { execute, loading, error } = useApi();
    const mockApiCall = vi.fn().mockResolvedValue({ data: 'test' });

    const result = await execute(mockApiCall);

    expect(result).toEqual({ data: 'test' });
    expect(mockApiCall).toHaveBeenCalled();
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API call errors', async () => {
    const { execute, loading, error } = useApi();
    const mockApiCall = vi.fn().mockRejectedValue(new Error('API Error'));

    const result = await execute(mockApiCall);

    expect(result).toBeNull();
    expect(loading.value).toBe(false);
    expect(error.value).toBe('API Error');
  });

  it('should set loading state during execution', async () => {
    const { execute, loading } = useApi();
    let loadingDuringExecution = false;

    const mockApiCall = vi.fn().mockImplementation(async () => {
      loadingDuringExecution = loading.value;
      return { data: 'test' };
    });

    await execute(mockApiCall);

    expect(loadingDuringExecution).toBe(true);
    expect(loading.value).toBe(false);
  });

  it('should handle errors without message', async () => {
    const { execute, error } = useApi();
    const mockApiCall = vi.fn().mockRejectedValue({});

    await execute(mockApiCall);

    expect(error.value).toBe('An error occurred');
  });
});
