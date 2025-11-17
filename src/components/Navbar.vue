<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// You can define your links here
const links = ref([
  { name: 'Home', to: '/' },
  { name: 'Items', to: '/items' },
  { name: 'About', to: '/about' },
  { name: 'Sales', to: '/sales' },
]);

const router = useRouter();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <a class="navbar-brand" href="#">Sari-Sari Store</a>

    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item" v-for="link in links" :key="link.to">
        <router-link class="nav-link" :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar-nav {
  display: flex;
  gap: 1rem;
}
</style>
