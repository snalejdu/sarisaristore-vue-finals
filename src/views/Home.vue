<template>
  <div class="container text-center my-5">
    <h1 class="mb-3">Welcome to SarisariStore Management</h1>
    <p class="lead mb-4">Manage your sari-sari store easily and efficiently.</p>
    <router-link to="/items" class="btn btn-primary btn-lg me-3">Manage Items</router-link>
    <router-link to="/api-data" class="btn btn-outline-primary btn-lg">View API Data</router-link>
  </div>
</template>

<script>
export default { name: 'Home' };
</script>
