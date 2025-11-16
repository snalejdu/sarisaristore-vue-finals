<template>
  <div>
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="card-title mb-4">Item Management</h2>

        <!-- Form always visible -->
        <item-form
          :initialData="currentItem"
          @submit="onSubmit"
        />

        <item-list
          :items="items"
          @edit="editItem"
          @delete="deleteItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import ItemForm from '../components/ItemForm.vue';
import ItemList from '../components/ItemList.vue';

export default {
  name: 'Items',
  components: { ItemForm, ItemList },

  setup() {
    const LS_KEY = 'sarisari_store_items';
    const items = ref([]);
    const currentItem = ref({ id: null, name: '', price: 0, quantity: 1 });

    // Load items from localStorage
    onMounted(() => {
      const stored = localStorage.getItem(LS_KEY);
      items.value = stored ? JSON.parse(stored) : [];
    });

    // Save items to localStorage
    watch(items, (newItems) => {
      localStorage.setItem(LS_KEY, JSON.stringify(newItems));
    }, { deep: true });

    const onSubmit = (item) => {
      if (item.id === null) {
        // Add new
        item.id = Date.now();
        items.value.push(item);
      } else {
        // Update existing
        const index = items.value.findIndex(i => i.id === item.id);
        if (index !== -1) items.value[index] = item;
      }

      // Reset form after submit
      currentItem.value = { id: null, name: '', price: 0, quantity: 1 };
    };

    const editItem = (item) => {
      currentItem.value = { ...item };
    };

    const deleteItem = (id) => {
      if (confirm('Delete this item?')) {
        items.value = items.value.filter(i => i.id !== id);
      }
    };

    return { items, currentItem, onSubmit, editItem, deleteItem };
  }
};
</script>
