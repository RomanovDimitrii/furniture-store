<script setup lang="ts">
import Nav from './components/Nav.vue';
import Filters from './components/Filters.vue';
import ProductCards from './components/ProductCards.vue';
</script>

<template>
  <div class="app-container">
    <Nav />

    <h1 class="title">Комплекты стеллажных систем</h1>
    <Filters />
    <ProductCards />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  padding: 32px 216px 103px;
  font-size: 16px;
  font-weight: 400;
  /* width: 100vw;
  height: 100vh; */
}

.title {
  font-family: 'SFProDisplay';
  font-weight: 500;
  font-size: 2.25rem;
  margin: 0;
}
</style>
