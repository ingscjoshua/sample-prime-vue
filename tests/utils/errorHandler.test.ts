import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleApiError } from '~/utils/errorHandler';

// Mock navigateTo globally
global.navigateTo = vi.fn();

describe('errorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleApiError', () => {
    it('should handle 401 unauthorized error', () => {
      const error = {
        response: { status: 401 },
      };

      const result = handleApiError(error);

      expect(result).toBe('Authentication required');
      expect(global.navigateTo).toHaveBeenCalledWith('/login');
    });

    it('should handle 404 not found error', () => {
      const error = {
        response: { status: 404 },
      };

      const result = handleApiError(error);

      expect(result).toBe('Resource not found');
    });

    it('should handle 500 server error', () => {
      const error = {
        response: { status: 500 },
      };

      const result = handleApiError(error);

      expect(result).toBe('Server error. Please try again later');
    });

    it('should handle 503 server error', () => {
      const error = {
        response: { status: 503 },
      };

      const result = handleApiError(error);

      expect(result).toBe('Server error. Please try again later');
    });

    it('should handle error with message', () => {
      const error = {
        message: 'Custom error message',
      };

      const result = handleApiError(error);

      expect(result).toBe('Custom error message');
    });

    it('should handle unknown error', () => {
      const error = {};

      const result = handleApiError(error);

      expect(result).toBe('An unexpected error occurred');
    });
  });
});
