import type { LoginCredentials, RegisterData, AuthResponse, User } from '~/models/user';

// API service for user authentication
export default class AuthService {
  private baseUrl = 'https://fakestoreapi.com'; // Using a fake store API for demonstration

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<User> {
    try {
      // For demo purposes, we'll simulate a successful registration
      // In a real app, you would make an API call like this:
      // const response = await fetch(`${this.baseUrl}/users`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // });
      
      // Simulate API response
      return {
        id: Math.floor(Math.random() * 1000),
        ...userData,
        token: 'demo-token-' + Math.random().toString(36).substring(2, 15),
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async socialLogin(provider: string, token: string): Promise<User> {
    try {
      // In a real app, you would validate the social token with your backend
      // For demo purposes, we'll simulate a successful login
      return {
        id: Math.floor(Math.random() * 1000),
        email: `user_${Math.random().toString(36).substring(2, 8)}@example.com`,
        username: `user_${Math.random().toString(36).substring(2, 8)}`,
        name: {
          firstname: 'Social',
          lastname: 'User',
        },
        token: `${provider}-token-${Math.random().toString(36).substring(2, 15)}`,
      };
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw error;
    }
  }

  async getUserProfile(token: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/users/1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get user profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}