import type { Product } from '~/models/product';
import { API_CONFIG } from '~/config/api';
import { handleApiError } from '~/utils/errorHandler';

// API service for products
export default class ProductService {
  private baseUrl = API_CONFIG.baseUrl;

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', handleApiError(error));
      return [];
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${id}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, handleApiError(error));
      return null;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      return [];
    }
  }
}