<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label class="form-label">Item Name</label>
      <input type="text" class="form-control" v-model="form.name" required>
    </div>

    <div class="mb-3">
      <label class="form-label">Price (₱)</label>
      <input type="number" class="form-control" v-model.number="form.price" min="0" step="0.01" required>
    </div>

    <div class="mb-3">
      <label class="form-label">Quantity</label>
      <input type="number" class="form-control" v-model.number="form.quantity" min="1" required>
    </div>

    <button type="submit" class="btn btn-primary me-2">
      {{ isEditMode ? 'Update' : 'Add' }}
    </button>

    <button v-if="isEditMode" type="button" class="btn btn-secondary" @click="$emit('cancel')">
      Cancel
    </button>
  </form>
</template>

<script>
import { reactive, watch, computed, onMounted } from "vue";

export default {
  name: "ItemForm",
  emits: ["submit", "cancel"],
  props: {
    initialData: {
      type: Object,
      default: () => ({
        id: null,
        name: "",
        price: 0,
        quantity: 1,
      }),
    },
  },

  setup(props, { emit }) {
    const STORAGE_KEY = "item_form_data";

    // Load saved data if exists
    const saved = localStorage.getItem(STORAGE_KEY);
    const form = reactive(saved ? JSON.parse(saved) : { ...props.initialData });

    // Update form when initialData changes
    watch(
      () => props.initialData,
      (newVal) => {
        Object.assign(form, newVal);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); // save to disk
      }
    );

    // Watch form and save changes to localStorage
    watch(
      form,
      () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      },
      { deep: true }
    );

    const isEditMode = computed(() => form.id !== null);

    const handleSubmit = () => {
      emit("submit", { ...form });

      // Clear localStorage after successful save
      localStorage.removeItem(STORAGE_KEY);
    };

    return {
      form,
      isEditMode,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
input.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
