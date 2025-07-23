<template>
  <div class="cart-page responsive-container">
    <Toast position="bottom-right" />
    <h1>{{ $t('shop.cart.title') }}</h1>
    
    <Message v-if="!cartStore.isAuthenticated" severity="info" :closable="false" class="mb-3">
      <template #content>
        <i class="pi pi-info-circle mr-2"></i>
        <span>{{ $t('shop.cart.loginRequired') }}</span>
      </template>
    </Message>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <i class="pi pi-shopping-cart empty-cart-icon"></i>
      <p>{{ $t('shop.cart.empty') }}</p>
      <Button :label="$t('shop.cart.continueShopping')" icon="pi pi-arrow-left" severity="secondary" @click="goToShop" />
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <DataTable :value="cartStore.items" responsiveLayout="scroll">
          <Column field="image" header="">
            <template #body="slotProps">
              <img :src="slotProps.data.image" :alt="slotProps.data.title" class="cart-item-image" />
            </template>
          </Column>
          
          <Column field="title" :header="$t('shop.cart.product')">
            <template #body="slotProps">
              <div class="cart-item-title">{{ slotProps.data.title }}</div>
            </template>
          </Column>
          
          <Column field="price" :header="$t('shop.cart.price')">
            <template #body="slotProps">
              ${{ slotProps.data.price.toFixed(2) }}
            </template>
          </Column>
          
          <Column field="quantity" :header="$t('shop.cart.quantity')">
            <template #body="slotProps">
              <InputNumber 
                v-model="slotProps.data.quantity" 
                showButtons 
                buttonLayout="horizontal"
                :min="1" 
                :max="10"
                size="small"
                @update:modelValue="updateQuantity(slotProps.data.id, $event)" 
              />
            </template>
          </Column>
          
          <Column field="total" :header="$t('shop.cart.total')">
            <template #body="slotProps">
              ${{ (slotProps.data.price * slotProps.data.quantity).toFixed(2) }}
            </template>
          </Column>
          
          <Column>
            <template #body="slotProps">
              <Button 
                icon="pi pi-trash" 
                severity="danger" 
                @click="removeItem(slotProps.data.id)" 
                text 
              />
            </template>
          </Column>
        </DataTable>
      </div>
      
      <div class="cart-summary">
        <Card>
          <template #title>{{ $t('shop.cart.orderSummary') }}</template>
          <template #content>
            <div class="summary-row">
              <span>{{ $t('shop.cart.items') }}:</span>
              <span>{{ cartStore.totalItems }}</span>
            </div>
            <div class="summary-row">
              <span>{{ $t('shop.cart.subtotal') }}:</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>{{ $t('shop.cart.shipping') }}:</span>
              <span>$0.00</span>
            </div>
            <div class="summary-row total">
              <span>{{ $t('shop.cart.total') }}:</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            
            <div class="checkout-actions">
              <Button :label="$t('shop.cart.checkout')" icon="pi pi-check" severity="success" class="w-full" />
              <Button :label="$t('shop.cart.continueShopping')" icon="pi pi-arrow-left" severity="secondary" class="w-full" outlined @click="goToShop" />
              <Button :label="$t('shop.cart.clearCart')" icon="pi pi-trash" severity="danger" class="w-full" text @click="clearCart" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const cartStore = useCartStore();
const router = useRouter();
const toast = useToast();
const { t } = useI18n();

function updateQuantity(productId: number, quantity: number) {
  cartStore.updateQuantity(productId, quantity);
}

function removeItem(productId: number) {
  const item = cartStore.items.find(item => item.id === productId);
  if (item) {
    const itemName = item.title;
    cartStore.removeItem(productId);
    toast.add({
      severity: 'info',
      summary: t('shop.toast.itemRemoved'),
      detail: t('shop.toast.productRemoved', { product: itemName }),
      life: 3000
    });
  }
}

function clearCart() {
  cartStore.clearCart();
  toast.add({
    severity: 'info',
    summary: t('shop.toast.cartCleared'),
    detail: t('shop.toast.allItemsRemoved'),
    life: 3000
  });
}

function goToShop() {
  router.push('/shop');
}
</script>

