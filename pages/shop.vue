<template>
  <div class="product-list responsive-container">
    <Toast position="bottom-right" />
    <h1>{{ $t('shop.products.title') }}</h1>
    
    <div class="filters">
      <Dropdown 
        v-model="selectedCategory" 
        :options="categories" 
        :placeholder="$t('shop.products.selectCategory')" 
        class="w-full md:w-14rem"
        @change="filterByCategory"
      />
    </div>
    
    <div v-if="loading" class="products-grid">
      <ProductSkeleton v-for="n in 8" :key="n" />
    </div>
    
    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <Card>
          <template #header>
            <NuxtImg 
              :src="product.image" 
              :alt="product.title" 
              class="product-image"
              loading="lazy"
              format="webp"
            />
          </template>
          <template #title>
            <h3 class="product-title">{{ product.title }}</h3>
          </template>
          <template #content>
            <div class="product-price">${{ product.price.toFixed(2) }}</div>
            <Rating :modelValue="product.rating?.rate || 0" readonly :cancel="false" />
          </template>
          <template #footer>
            <div class="card-footer">
              <Button icon="pi pi-search" rounded @click="viewProductDetails(product.id)" />
              <Button icon="pi pi-shopping-cart" rounded severity="success" @click="addToCart(product)" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductService from '~/services/ProductService';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import type { Product } from '~/models/product';

// SEO Meta
useSeoMeta({
  title: 'Shop - Browse Products',
  description: 'Browse our collection of quality products'
});

const productService = new ProductService();
const cartStore = useCartStore();
const router = useRouter();
const toast = useToast();
const { t } = useI18n();

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const selectedCategory = ref<string | null>(null);
const loading = ref(true);

onMounted(async () => {
  await Promise.all([
    fetchProducts(),
    fetchCategories()
  ]);
});

async function fetchProducts() {
  loading.value = true;
  try {
    products.value = await productService.getProducts();
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    loading.value = false;
  }
}

async function fetchCategories() {
  try {
    categories.value = await productService.getCategories();
    // Add "All" option
    categories.value.unshift('all');
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function filterByCategory() {
  loading.value = true;
  try {
    if (!selectedCategory.value || selectedCategory.value === 'all') {
      products.value = await productService.getProducts();
    } else {
      products.value = await productService.getProductsByCategory(selectedCategory.value);
    }
  } catch (error) {
    console.error('Error filtering products:', error);
  } finally {
    loading.value = false;
  }
}

function addToCart(product: Product) {
  cartStore.addItem(product);
  toast.add({
    severity: 'success',
    summary: t('shop.toast.addedToCart'),
    detail: t('shop.toast.productAdded', { product: product.title }),
    life: 3000
  });
}

function viewProductDetails(productId: number) {
  router.push(`/product/${productId}`);
}
</script>

