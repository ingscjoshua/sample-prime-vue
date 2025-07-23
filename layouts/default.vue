<template>
  <div class="site-wrapper">
    <menu-toolbar></menu-toolbar>
    <div class="main-page">
      <slot> </slot>
    </div>
    <footer-main></footer-main>
  </div>
</template>
<script lang="ts" setup>
import menuToolbar from './menu-toolbar.vue';
import footerMain from '~/layouts/footer-main.vue';
</script>
