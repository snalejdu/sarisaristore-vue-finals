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

    <button v-if="isEditMode" type="button" class="btn btn-secondary" @click="cancel">
      Cancel
    </button>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';

// Props and Emits
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ id: null, name: '', price: 0, quantity: 1 })
  }
});
const emit = defineEmits(['submit', 'cancel']);

// Reactive form
const form = reactive({ ...props.initialData });

// Watch parent changes and update form
watch(() => props.initialData, (newVal) => {
  Object.assign(form, newVal);
});

// Computed: edit mode
const isEditMode = computed(() => form.id !== null);

// Submit
const handleSubmit = () => {
  emit('submit', { ...form });
};

// Cancel
const cancel = () => {
  emit('cancel');               // Notify parent
  Object.assign(form, props.initialData); // Reset form locally
};
</script>
