import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import ProductService from '~/services/ProductService';
import type { Product } from '~/models/product';

describe('ProductService', () => {
  let productService: ProductService;
  let fetchMock: any;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 29.99,
      description: 'Description 1',
      category: 'electronics',
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 39.99,
      description: 'Description 2',
      category: 'clothing',
      image: 'image2.jpg',
      rating: { rate: 4.0, count: 50 },
    },
  ];

  beforeEach(() => {
    productService = new ProductService();
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await productService.getProducts();

      expect(result).toEqual(mockProducts);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/products')
      );
    });

    it('should return empty array on error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await productService.getProducts();

      expect(result).toEqual([]);
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await productService.getProducts();

      expect(result).toEqual([]);
    });
  });

  describe('getProduct', () => {
    it('should fetch a single product by id', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts[0],
      });

      const result = await productService.getProduct(1);

      expect(result).toEqual(mockProducts[0]);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/products/1')
      );
    });

    it('should return null on error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await productService.getProduct(999);

      expect(result).toBeNull();
    });
  });

  describe('getCategories', () => {
    it('should fetch all categories', async () => {
      const mockCategories = ['electronics', 'clothing', 'jewelry'];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const result = await productService.getCategories();

      expect(result).toEqual(mockCategories);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/products/categories')
      );
    });

    it('should return empty array on error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await productService.getCategories();

      expect(result).toEqual([]);
    });
  });

  describe('getProductsByCategory', () => {
    it('should fetch products by category', async () => {
      const electronicsProducts = [mockProducts[0]];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => electronicsProducts,
      });

      const result = await productService.getProductsByCategory('electronics');

      expect(result).toEqual(electronicsProducts);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/products/category/electronics')
      );
    });

    it('should return empty array on error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await productService.getProductsByCategory('invalid');

      expect(result).toEqual([]);
    });
  });
});
