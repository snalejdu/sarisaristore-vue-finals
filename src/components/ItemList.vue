<template>
  <div>
    <h3 class="mb-4">Items List</h3>

    <p v-if="items.length === 0" class="fs-5 text-muted">No items added yet.</p>

    <table class="table table-striped table-hover">
  <thead class="table-primary">
    <tr>
      <th>Name</th>
      <th>Price (₱)</th>
      <th>Quantity</th>
      <th>Total (₱)</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.price.toFixed(2) }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', item)">Edit</button>
        <button class="btn btn-danger btn-sm" @click="$emit('delete', item.id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    <p v-if="items.length > 0" class="text-end mt-3 fw-bold fs-5">
      Grand Total: ₱{{ grandTotal.toFixed(2) }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const grandTotal = computed(() =>
      props.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );

    return { grandTotal };
  },
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f0f4ff;
}
</style>