<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import VsSelect from 'vs-vue3-select';
import 'vs-vue3-select/dist/vs-vue3-select.css';

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

const onSortChange = (value: string) => {
  store.commit('setSort', value);
};

const onMaterialChange = (value: string) => {
  store.commit('setMaterial', value);
};
</script>

<template>
  <section class="filters">
    <div class="filters__wrapper">
      <label class="filters__label" for="sortBy">Сортировать по:</label>

      <VsSelect
        v-model="sortBy"
        id="sortBy"
        class="filters__select"
        :options="[
          { label: 'Цена по возрастанию', value: 'byIncreasing' },
          { label: 'Цена по убыванию', value: 'byDecreasing' }
        ]"
        @update:modelValue="onSortChange"
        :clearable="false"
      />
    </div>
    <div class="filters__wrapper">
      <label class="filters__label" for="material">Материал</label>

      <VsSelect
        v-model="material"
        id="material"
        class="filters__select"
        :options="[
          { label: 'Все', value: 'all' },
          { label: 'Металл', value: 'Металл' },
          { label: 'Дерево', value: 'Дерево' }
        ]"
        @update:modelValue="onMaterialChange"
        :clearable="false"
      />
    </div>
  </section>
</template>

<style>
.filters {
  display: flex;
  flex-direction: row;
  margin: 36px 0 23px;
  column-gap: 24px;
}

.filters__label {
  font-family: 'SFProDisplay';
  font-size: 0.75rem;
  letter-spacing: 3%;
  color: #4f4f4f;
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 15px;
}
.filters__select .vs__selected,
.filters__select .vs__dropdown-toggle,
.filters__select .vs__dropdown-menu {
  font-family: 'SFProDisplay';
  font-size: 0.875rem;
}

.filters__select .vs__dropdown-toggle {
  width: 288px;
  height: 40px;
  border-radius: 0px;
  background-color: #f2f2f2;
  border: none;
  padding-left: 2px;
}

:root {
  --vs-dropdown-option--active-bg: #151717;
  --vs-font-size: 1.875rem;
  --vs-controls-size: 1.8;
  --vs-dropdown-option--selected-bg: rgb(104, 104, 104);
  --vs-actions-padding: 0 15px 0 0;
}

@media screen and (max-width: 850px) {
  .filters {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0;
  }

  .filters__wrapper {
    margin-bottom: 20px;
  }
}
</style>
