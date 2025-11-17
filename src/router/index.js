import { createRouter, createWebHistory } from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Items from '../views/Items.vue';
import ApiData from '../views/ApiData.vue';

// Pages
import Sales from '../pages/Sales.vue';
import About from '../pages/About.vue';
import EditProduct from '../pages/EditProduct.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/items', name: 'Items', component: Items },
  { path: '/api-data', name: 'ApiData', component: ApiData },

  // Pages
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/about', name: 'About', component: About },
  { path: '/edit-product/:id', name: 'EditProduct', component: EditProduct, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
