<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">SariSariStore</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="link in links" :key="link.name" class="nav-item">
            <router-link class="nav-link" :to="link.to" active-class="active">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [
        { name: 'Home', to: '/' },
        { name: 'Items', to: '/items' },
        { name: 'API Data', to: '/api-data' },
      ]
    }
  }
}
</script>
