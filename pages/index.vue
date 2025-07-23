<template>
  <div class="home-page responsive-container">
    <div class="hero-section">
      <h1>{{ $t('general.home.welcome') }}</h1>
      <p>{{ $t('general.home.description') }}</p>
      <div class="hero-actions">
        <Button :label="$t('shop.menu.shop')" icon="pi pi-shopping-bag" size="large" severity="primary" raised @click="goToShop" />
      </div>
    </div>
    
    <div class="featured-section">
      <h2>{{ $t('shop.home.featured') }}</h2>
      <div v-if="loading" class="loading">
        <ProgressSpinner strokeWidth="4" animationDuration=".5s" />
      </div>
      <div v-else class="featured-products">
        <div v-for="product in featuredProducts" :key="product.id" class="featured-product">
          <Card>
            <template #header>
              <img :src="product.image" :alt="product.title" class="product-image" />
            </template>
            <template #title>
              <h3 class="product-title">{{ product.title }}</h3>
            </template>
            <template #content>
              <div class="product-price">${{ product.price.toFixed(2) }}</div>
            </template>
            <template #footer>
              <Button :label="$t('shop.product.viewDetails')" icon="pi pi-eye" outlined @click="viewProduct(product.id)" />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductService from '~/services/ProductService';

const router = useRouter();
const productService = new ProductService();

const featuredProducts = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  await loadFeaturedProducts();
});

async function loadFeaturedProducts() {
  try {
    const products = await productService.getProducts();
    // Get 3 random products as featured
    featuredProducts.value = products
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  } catch (error) {
    console.error('Error loading featured products:', error);
  } finally {
    loading.value = false;
  }
}

function goToShop() {
  router.push('/shop');
}

function viewProduct(productId: number) {
  router.push(`/product/${productId}`);
}
</script>

