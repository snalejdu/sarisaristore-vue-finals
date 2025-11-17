<template>
  <div class="container mt-5">
    <h2>Sales / Cart</h2>

    <!-- Inventory Items -->
    <div v-if="items.length === 0" class="text-center my-5">
      No items in inventory.
    </div>

    <div class="row">
      <div v-for="item in items" :key="item.id" class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">Price: ₱{{ item.price.toFixed(2) }}</p>
            <p class="card-text">Stock: {{ item.quantity }}</p>

            <div class="d-flex gap-2">
              <input
                type="number"
                v-model.number="itemQty[item.id]"
                :max="item.quantity"
                min="1"
                class="form-control"
              />
              <button class="btn btn-primary btn-sm" @click="addToCart(item)">
                Add to Cart
              </button>
            </div>
            <small class="text-danger" v-if="itemQty[item.id] > item.quantity">
              Cannot exceed stock!
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart -->
    <div v-if="cart.length > 0" class="mt-5">
      <h3>Cart</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (₱)</th>
            <th>Quantity</th>
            <th>Subtotal (₱)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in cart" :key="c.id">
            <td>{{ c.name }}</td>
            <td>{{ c.price.toFixed(2) }}</td>
            <td>{{ c.qty }}</td>
            <td>{{ (c.price * c.qty).toFixed(2) }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="removeItem(c.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Total: ₱{{ total.toFixed(2) }}</h4>
      <button class="btn btn-success" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Inventory
const items = ref([]);
onMounted(() => {
  const storedItems = localStorage.getItem('sarisari_store_items');
  items.value = storedItems ? JSON.parse(storedItems) : [];
});

// Cart
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

// Track quantities
const itemQty = ref({});
items.value.forEach(item => itemQty.value[item.id] = 1);

// Add to cart with stock limit
const addToCart = (item) => {
  const qty = itemQty.value[item.id];

  if (qty < 1) {
    alert("Quantity must be at least 1");
    return;
  }
  if (qty > item.quantity) {
    alert(`Cannot add more than ${item.quantity} in stock`);
    itemQty.value[item.id] = item.quantity;
    return;
  }

  const existing = cart.value.find(c => c.id === item.id);
  if (existing) {
    if (existing.qty + qty > item.quantity) {
      alert(`Cannot exceed stock: ${item.quantity}`);
      return;
    }
    existing.qty += qty;
  } else {
    cart.value.push({ ...item, qty });
  }

  saveCart();
  alert(`${item.name} added to cart!`);
};

// Remove item from cart
const removeItem = (id) => {
  cart.value = cart.value.filter(c => c.id !== id);
  saveCart();
};

// Save cart
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

// Total
const total = computed(() =>
  cart.value.reduce((sum, c) => sum + c.price * c.qty, 0)
);

// Checkout (deduct stock)
const checkout = () => {
  const inventory = JSON.parse(localStorage.getItem('sarisari_store_items')) || [];

  for (const c of cart.value) {
    const item = inventory.find(i => i.id === c.id);
    if (item) {
      if (c.qty > item.quantity) {
        alert(`Cannot checkout more than available stock for ${item.name}`);
        return;
      }
      item.quantity -= c.qty; // Deduct stock
    }
  }

  // Save updated inventory
  localStorage.setItem('sarisari_store_items', JSON.stringify(inventory));

  // Clear cart
  cart.value = [];
  saveCart();

  alert('Checkout successful!');
  router.push('/'); // go back to home or inventory
};
</script>
