<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, watch } from 'vue';

defineOptions({
  name: 'Filters'
});

const store = useStore();
const sortBy = ref(store.state.currentSort);
const material = ref(store.state.currentMaterial);

watch(
  () => store.state.currentSort,
  newSort => {
    sortBy.value = newSort;
  }
);

watch(
  () => store.state.currentMaterial,
  newMaterial => {
    material.value = newMaterial;
  }
);

const onSortChange = (event: Event) => {
  const sortType = (event.target as HTMLSelectElement).value;
  store.commit('setSort', sortType);
};

const onMaterialChange = (event: Event) => {
  const material = (event.target as HTMLSelectElement).value;
  store.commit('setMaterial', material);
};
</script>

<template>
  <section class="filters">
    <label class="filters__label">
      Сортировать по:
      <div class="filters__select-wrapper">
        <select v-model="sortBy" class="filters__select" id="sortBy" @change="onSortChange">
          <option class="filters__option" value="byIncreasing">По возрастанию</option>
          <option class="filters__option" value="byDecreasing">По убыванию</option>
        </select>
      </div>
    </label>
    <label class="filters__label">
      Материал
      <div class="filters__select-wrapper">
        <select v-model="material" class="filters__select" id="material" @change="onMaterialChange">
          <option class="filters__option" value="all">Все</option>
          <option class="filters__option" value="Металл">Металл</option>
          <option class="filters__option" value="Дерево">Дерево</option>
        </select>
      </div>
    </label>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: row;
  margin: 32px 0 23px;
  column-gap: 24px;
}

.filters__label {
  font-family: 'SFProDisplay';
  font-size: 0.75rem;
  letter-spacing: 3%;
  color: #4f4f4f;
  display: flex;
  flex-direction: column;
}

.filters__select-wrapper {
  position: relative;
  width: 288px;
  height: 40px;
  background-color: #f2f2f2;
  box-sizing: border-box;
}

.filters__select {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border: none;
  padding: 0 10px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.filters__select-wrapper::after {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: url('../pic/arrow-for-select.svg') no-repeat;
  background-size: contain;
}

.filters__option {
  padding: 0 10px;
}

.filters__option:hover {
  background-color: red;
}

@media screen and (max-width: 850px) {
  .filters {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0;
    row-gap: 30px;
  }
}
</style>
