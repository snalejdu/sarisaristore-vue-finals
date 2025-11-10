<template>
  <div class="api-data p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">API Data</h2>

    <!-- Loading State -->
    <p v-if="loading" class="text-gray-500">Loading data...</p>

    <!-- Error State -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Data List -->
    <ul v-if="!loading && !error">
      <li
        v-for="item in data"
        :key="item.id"
        class="mb-2 p-2 border rounded flex justify-between items-center"
      >
        <span>{{ item.title }}</span>
        <span
          :class="item.completed ? 'text-green-600' : 'text-yellow-600'"
        >
          {{ item.completed ? 'Done' : 'Pending' }}
        </span>
      </li>
    </ul>

    <!-- Empty State -->
    <p v-if="!loading && !error && data.length === 0" class="text-gray-400">
      No data found.
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "ApiData",
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = async () => {
      loading.value = true;
      error.value = null;

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        data.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return { data, loading, error };
  },
};
</script>

<style scoped>
.api-data {
  max-width: 500px;
  margin: auto;
}
</style>
