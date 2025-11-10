<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Price: ${{ product.price }}</p>
      <p class="card-text" :class="product.stock < 5 ? 'text-danger fw-bold' : ''">
        Stock: {{ product.stock }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>
