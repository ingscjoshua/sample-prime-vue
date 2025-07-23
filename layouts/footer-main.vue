<template>
  <Panel>
    <div class="responsive-container footer-content">
      <div class="footer-section">
        <h3>{{ $t('general.footer.about') }}</h3>
        <p>{{ $t('general.footer.aboutText') }}</p>
      </div>
      <div class="footer-section">
        <h3>{{ $t('general.footer.contact') }}</h3>
        <p>{{ $t('general.footer.contactText') }}</p>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel';
</script>

<style scoped>
.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
}
</style>
