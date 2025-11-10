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

  <button type="submit" class="btn btn-primary me-2">{{ isEditMode ? 'Update' : 'Add' }}</button>
  <button v-if="isEditMode" type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
</form>

</template>

<script>
import { reactive, watch, computed } from 'vue';

export default {
  name: 'ItemForm',
  emits: ['submit', 'cancel'],
  props: {
    initialData: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        price: 0,
        quantity: 1,
      }),
    },
  },
  setup(props, { emit }) {
    const form = reactive({ ...props.initialData });

    watch(
      () => props.initialData,
      (newVal) => {
        Object.assign(form, newVal);
      }
    );

    const isEditMode = computed(() => form.id !== null);

    // Validation flags
    const nameError = computed(() => !form.name.trim());
    const priceError = computed(() => form.price < 0 || form.price === null);
    const quantityError = computed(() => form.quantity < 1 || form.quantity === null);

    const handleSubmit = () => {
      if (nameError.value || priceError.value || quantityError.value) return;
      emit('submit', { ...form });
    };

    return {
      form,
      isEditMode,
      handleSubmit,
      nameError,
      priceError,
      quantityError,
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