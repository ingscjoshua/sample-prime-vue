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
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  {
    label: 'general.layout.menu.start',
    icon: 'pi pi-home',
  },
  {
    label: 'general.layout.menu.new',
    icon: 'pi pi-sparkles',
  },
]);
</script>
