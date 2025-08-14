<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-rating"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-price {
  height: 16px;
  width: 60%;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-rating {
  height: 16px;
  width: 40%;
  background: #f0f0f0;
  border-radius: 4px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>