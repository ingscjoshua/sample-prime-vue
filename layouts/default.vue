<template>
  <menu-toolbar></menu-toolbar>
  <div>
    <slot> </slot>
  </div>
  <footer-main></footer-main>
</template>
<script lang="ts" setup>
import menuToolbar from './menu-toolbar.vue';
import footerMain from '~/layouts/footer-main.vue';
</script>
