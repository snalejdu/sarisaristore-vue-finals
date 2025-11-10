<template>
  <div class="container mt-5">
    <h2>Sales / Cart</h2>
    <div v-if="cart.length === 0" class="text-center my-5">Your cart is empty</div>

    <div class="row">
      <div v-for="item in cart" :key="item.id" class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">Price: ${{ item.price }}</p>
            <p class="card-text">Quantity: <input v-model.number="item.qty" type="number" min="1" class="form-control" /></p>
            <p class="card-text">Subtotal: ${{ item.qty * item.price }}</p>
            <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.length > 0" class="mt-4">
      <h4>Total: ${{ total }}</h4>
      <button class="btn btn-success" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || []
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }
  },
  methods: {
    removeItem(id) {
      this.cart = this.cart.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    checkout() {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      this.cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) prod.stock -= item.qty;
      });
      localStorage.setItem('products', JSON.stringify(products));
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
      alert('Checkout successful!');
      this.$router.push('/inventory');
    }
  }
}
</script>
