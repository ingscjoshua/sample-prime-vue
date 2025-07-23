<template>
  <div class="card">
    <Menubar :model="items">
      <template #start> </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ $t(item.label) }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <div v-if="isLoggedIn">
            <Button icon="pi pi-user" text rounded aria-label="User" />
            <Button :label="$t('shop.auth.logout')" icon="pi pi-sign-out" text @click="logout" />
          </div>
          <Button v-else :label="$t('shop.auth.login')" icon="pi pi-sign-in" @click="goToLogin" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';

interface MenuItem {
  label: string;
  icon: string;
  badge?: string;
  shortcut?: string;
  command?: () => void;
}

const router = useRouter();
const cartStore = useCartStore();

const cartItemCount = computed(() => cartStore.totalItems);
const isLoggedIn = computed(() => cartStore.isAuthenticated);

const menuItems = computed(() => [
  {
    label: 'general.layout.menu.start',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'shop.menu.shop',
    icon: 'pi pi-shopping-bag',
    command: () => router.push('/shop')
  },
  {
    label: 'shop.menu.cart',
    icon: 'pi pi-shopping-cart',
    badge: cartItemCount.value ? cartItemCount.value.toString() : undefined,
    command: () => {
      if (isLoggedIn.value) {
        router.push('/cart');
      } else {
        router.push('/login?redirect=/cart');
      }
    }
  },
]);

const items = computed(() => menuItems.value);

function goToLogin() {
  router.push('/login');
}

function logout() {
  cartStore.logout();
  router.push('/');
}
</script>
