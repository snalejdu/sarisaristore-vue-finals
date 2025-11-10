<template>
  <div class="container mt-5">
    <h2>Edit Product</h2>
    <form @submit.prevent="updateProduct" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Product Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Price</label>
        <input v-model.number="price" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Stock</label>
        <input v-model.number="stock" type="number" class="form-control" required />
      </div>
      <button class="btn btn-primary">Update Product</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      name: '',
      price: 0,
      stock: 0,
    }
  },
  mounted() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id == this.id);
    if (product) {
      this.name = product.name;
      this.price = product.price;
      this.stock = product.stock;
    }
  },
  methods: {
    updateProduct() {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.map(p => p.id == this.id ? { ...p, name: this.name, price: this.price, stock: this.stock } : p);
      localStorage.setItem('products', JSON.stringify(products));
      this.$router.push('/inventory');
    }
  }
}
</script>
