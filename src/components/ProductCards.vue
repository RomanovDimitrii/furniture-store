<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

import Card from './Card.vue';

defineOptions({
  name: 'ProductCards'
});

const store = useStore();

onMounted(() => {
  store.dispatch('loadItems');
  store.dispatch('loadFilterState');
});

const items = computed(() => store.getters.sortedAndFilteredItems);
</script>

<template>
  <ul class="cards">
    <template v-for="item in items" :key="item.id">
      <Card :item="item" />
    </template>
  </ul>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, min-content);
  list-style: none;
  padding: 0;
  margin: 0;
  column-gap: 48px;
  row-gap: 40px;
}
</style>
