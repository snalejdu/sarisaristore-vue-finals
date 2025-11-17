<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h2 class="mb-4">Item Management</h2>

      <ItemForm
        :initialData="currentItem"
        @submit="onSubmit"
        @cancel="cancelEdit"
      />

      <ItemList
        :items="items"
        @edit="editItem"
        @delete="deleteItem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import ItemForm from '../components/ItemForm.vue';
import ItemList from '../components/ItemList.vue';

// LocalStorage key
const LS_KEY = 'sarisari_store_items';

// Reactive items
const items = ref([]);

// Current item for editing
const currentItem = ref({ id: null, name: '', price: 0, quantity: 1 });

// Load items from localStorage
onMounted(() => {
  const stored = localStorage.getItem(LS_KEY);
  items.value = stored ? JSON.parse(stored) : [];
});

// Save to localStorage
watch(items, (newItems) => {
  localStorage.setItem(LS_KEY, JSON.stringify(newItems));
}, { deep: true });

// Handle submit
const onSubmit = (item) => {
  if (item.id === null) {
    item.id = Date.now();
    items.value.push(item);
  } else {
    const index = items.value.findIndex(i => i.id === item.id);
    if (index !== -1) items.value[index] = { ...item };
  }
  resetForm();
};

// Edit
const editItem = (item) => {
  currentItem.value = { ...item };
};

// Delete
const deleteItem = (id) => {
  if (confirm('Delete this item?')) {
    items.value = items.value.filter(i => i.id !== id);
  }
};

// Cancel
const cancelEdit = () => {
  resetForm();
};

// Reset form
const resetForm = () => {
  currentItem.value = { id: null, name: '', price: 0, quantity: 1 };
};
</script>
