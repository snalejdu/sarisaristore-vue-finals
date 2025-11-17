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

      <!-- BUTTONS -->
      <div class="d-flex gap-2">
        <button class="btn btn-primary">Update Product</button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: { type: [String, Number], required: true }
});

const router = useRouter();

const name = ref('');
const price = ref(0);
const stock = ref(0);

// Load product
onMounted(() => {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id == props.id);

  if (product) {
    name.value = product.name;
    price.value = product.price;
    stock.value = product.stock;
  }
});

// Update product
const updateProduct = () => {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  products = products.map(p =>
    p.id == props.id
      ? { ...p, name: name.value, price: price.value, stock: stock.value }
      : p
  );

  localStorage.setItem('products', JSON.stringify(products));
  router.push('/inventory');
};

// ❗ NEW — Cancel function
const cancelEdit = () => {
  router.push('/inventory');
};
</script>
