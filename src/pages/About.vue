<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h2>About Sari-Sari Store System</h2>
      <p>This system is designed to help small sari-sari store owners manage inventory and sales efficiently.</p>
      <p><strong>Demo Product:</strong> <ProductCard :product="demoProduct" /></p>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue';
import { reactive } from 'vue';

const demoProduct = reactive({
  id: 1,
  name: 'Skyflakes',
  price: 17,
  stock: 30
});
</script>

