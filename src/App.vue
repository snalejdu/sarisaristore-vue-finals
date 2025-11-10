<template>
  <div>
    <Navbar />
    <div class="container my-5">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar, Footer }
};
</script>

<style>
body {
  background-color: #f8f9fa; /* Light gray background */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
