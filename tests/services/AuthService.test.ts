import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import AuthService from '~/services/AuthService';
import type { User } from '~/models/user';

describe('AuthService', () => {
  let authService: AuthService;
  let fetchMock: any;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    name: { firstname: 'Test', lastname: 'User' },
    phone: '1234567890',
  };

  const mockAuthResponse = {
    token: 'test-token-123',
  };

  beforeEach(() => {
    authService = new AuthService();
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAuthResponse,
      });

      const result = await authService.login('testuser', 'password123');

      expect(result).toEqual(mockAuthResponse);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'testuser',
            password: 'password123',
          }),
        })
      );
    });

    it('should throw error on failed login', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(authService.login('wrong', 'credentials')).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      await expect(authService.login('user', 'pass')).rejects.toThrow();
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerData = {
        email: 'new@example.com',
        username: 'newuser',
        password: 'password123',
        name: { firstname: 'New', lastname: 'User' },
        phone: '1234567890',
      };

      const result = await authService.register(registerData);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe(registerData.email);
      expect(result.username).toBe(registerData.username);
    });
  });

  describe('socialLogin', () => {
    it('should login with social provider', async () => {
      const result = await authService.socialLogin('google', 'google-token');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('username');
      expect(result).toHaveProperty('token');
      expect(result.token).toContain('google-token');
    });

    it('should handle different providers', async () => {
      const googleResult = await authService.socialLogin('google', 'token');
      const facebookResult = await authService.socialLogin('facebook', 'token');

      expect(googleResult.token).toContain('google-token');
      expect(facebookResult.token).toContain('facebook-token');
    });
  });

  describe('getUserProfile', () => {
    it('should fetch user profile with token', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await authService.getUserProfile('test-token');

      expect(result).toEqual(mockUser);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/users/1'),
        expect.objectContaining({
          headers: { Authorization: 'Bearer test-token' },
        })
      );
    });

    it('should throw error on failed profile fetch', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(authService.getUserProfile('invalid-token')).rejects.toThrow();
    });
  });
});
