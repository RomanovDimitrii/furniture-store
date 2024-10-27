<script setup lang="ts">
import Nav from './components/Nav.vue';
import Filters from './components/Filters.vue';
import ProductCards from './components/ProductCards.vue';
</script>

<template>
  <main class="app-container">
    <Nav />

    <h1 class="title">Комплекты стеллажных систем</h1>
    <Filters />
    <ProductCards />
  </main>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  padding: 15px 11.25vw 103px;
}

.title {
  font-family: 'SFProDisplay';
  font-weight: 600;
  font-size: 2.25rem;
  margin: 20px 0 0;
}

@media screen and (max-width: 850px) {
  .app-container {
    padding: 15px 5vw 103px;
  }
}
</style>
