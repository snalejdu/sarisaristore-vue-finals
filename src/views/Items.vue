<template>
  <div>
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="card-title mb-4">Item Management</h2>

        <item-form
          v-if="formVisible"
          :initialData="currentItem"
          @submit="onSubmit"
          @cancel="cancelEdit"
        />

        <button
          v-if="!formVisible"
          @click="showFormForAdd"
          class="btn btn-primary mb-3"
        >
          Add New Item
        </button>

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
    const formVisible = ref(false);
    const currentItem = ref(null);

    onMounted(() => {
      const stored = localStorage.getItem(LS_KEY);
      items.value = stored ? JSON.parse(stored) : [];
    });

    watch(items, (newItems) => {
      localStorage.setItem(LS_KEY, JSON.stringify(newItems));
    }, { deep: true });

    const showFormForAdd = () => {
      currentItem.value = { id: null, name: '', price: 0, quantity: 1 };
      formVisible.value = true;
    };

    const onSubmit = (item) => {
      if (item.id === null) {
        item.id = Date.now();
        items.value.push(item);
      } else {
        const index = items.value.findIndex(i => i.id === item.id);
        if (index !== -1) items.value[index] = item;
      }
      formVisible.value = false;
      currentItem.value = null;
    };

    const editItem = (item) => {
      currentItem.value = { ...item };
      formVisible.value = true;
    };

    const cancelEdit = () => { formVisible.value = false; currentItem.value = null; };
    const deleteItem = (id) => { if (confirm('Delete this item?')) items.value = items.value.filter(i => i.id !== id); };

    return { items, formVisible, currentItem, showFormForAdd, onSubmit, editItem, cancelEdit, deleteItem };
  }
};
</script>
