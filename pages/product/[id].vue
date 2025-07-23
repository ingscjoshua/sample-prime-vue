<template>
  <div class="product-detail responsive-container">
    <Toast position="bottom-right" />
    <div v-if="loading" class="loading">
      <ProgressSpinner strokeWidth="4" animationDuration=".5s" />
    </div>
    
    <div v-else-if="product" class="product-content">
      <div class="product-image-container">
        <img :src="product.image" :alt="product.title" class="product-image" />
      </div>
      
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        
        <div class="product-rating">
          <Rating :modelValue="product.rating?.rate || 0" readonly :cancel="false" />
          <span class="rating-count">({{ product.rating?.count || 0 }})</span>
        </div>
        
        <div class="product-category">
          <Badge :value="product.category" severity="info" />
        </div>
        
        <div class="product-price">${{ product.price?.toFixed(2) }}</div>
        
        <p class="product-description">{{ product.description }}</p>
        
        <div class="product-actions">
          <InputNumber v-model="quantity" showButtons buttonLayout="horizontal" :min="1" :max="10" inputClass="w-full" />
          <Button icon="pi pi-shopping-cart" :label="$t('shop.product.addToCart')" @click="addToCart" severity="success" />
        </div>
      </div>
    </div>
    
    <div v-else class="error-message">
      {{ $t('shop.product.notFound') }}
    </div>
    
    <div class="navigation-buttons">
      <Button icon="pi pi-arrow-left" :label="$t('shop.product.backToShop')" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductService from '~/services/ProductService';
import { useCartStore } from '~/stores/cart';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const productService = new ProductService();
const cartStore = useCartStore();
const toast = useToast();
const { t } = useI18n();

const product = ref<any>(null);
const loading = ref(true);
const quantity = ref(1);

onMounted(async () => {
  const productId = Number(route.params.id);
  if (!isNaN(productId)) {
    await fetchProduct(productId);
  } else {
    loading.value = false;
  }
});

async function fetchProduct(id: number) {
  loading.value = true;
  try {
    product.value = await productService.getProduct(id);
  } catch (error) {
    console.error(`Error loading product ${id}:`, error);
  } finally {
    loading.value = false;
  }
}

function addToCart() {
  if (product.value) {
    // Add the product with the selected quantity
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem(product.value);
    }
    toast.add({
      severity: 'success',
      summary: t('shop.toast.addedToCart'),
      detail: t('shop.toast.itemsAdded', { count: quantity.value }),
      life: 3000
    });
  }
}

function goBack() {
  router.push('/shop');
}
</script>

