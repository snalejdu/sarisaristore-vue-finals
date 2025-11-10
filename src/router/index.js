import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Items from '../views/Items.vue';
import ApiData from '../views/ApiData.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/items', name: 'Items', component: Items },
  { path: '/api-data', name: 'ApiData', component: ApiData },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
