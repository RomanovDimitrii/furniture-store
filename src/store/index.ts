import { createStore } from 'vuex';
import itemsData from '@/assets/data/items.json';
import materialData from '@/assets/data/materials.json';
import {
  getItemsFromLocalStorage,
  saveItemsToLocalStorage,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage
} from '@/utils/storage';

interface FilterOption {
  label: string;
  value: string;
}

interface Item {
  id: string;
  name: string;
  code: string | null;
  price: {
    old_price: number | null;
    current_price: number;
  };
  image: {
    url: string;
  };
  material: number;
  materialName?: string;
  isLiked: boolean;
  quantityPurchased: number;
}

interface State {
  items: Item[];
  currentSort: FilterOption;
  currentMaterial: FilterOption;
}

export default createStore({
  state: {
    items: [] as Item[],
    currentSort: { label: 'Цена по возрастанию', value: 'byIncreasing' },
    currentMaterial: { label: 'Все', value: 'all' }
  } as State,
  mutations: {
    setItems(state: State, items: Item[]) {
      state.items = items;
    },
    toggleItemLiked(state: State, itemId: string) {
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.isLiked = !item.isLiked;
      }
      saveItemsToLocalStorage(state.items);
    },
    updateItemQuantityPurchased(
      state: State,
      { itemId, quantity }: { itemId: string; quantity: number }
    ) {
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.quantityPurchased = quantity;
      }
      saveItemsToLocalStorage(state.items);
    },

    setSort(state: State, sortType: FilterOption) {
      state.currentSort = sortType;
      saveFiltersToLocalStorage({
        currentSort: state.currentSort,
        currentMaterial: state.currentMaterial
      });
    },
    setMaterial(state: State, material: FilterOption) {
      state.currentMaterial = material;
      saveFiltersToLocalStorage({
        currentSort: state.currentSort,
        currentMaterial: state.currentMaterial
      });
    }
  },
  actions: {
    loadItems({ commit }) {
      const storedItems = getItemsFromLocalStorage();

      if (storedItems) {
        commit('setItems', storedItems);
      } else {
        const items = itemsData.map((item: any) => {
          const materialObject = materialData.find(
            (material: any) => parseInt(material.id) === item.material
          );
          const materialName = materialObject?.name ? materialObject.name : 'Unknown Material';
          return {
            ...item,
            materialName: materialName,
            isLiked: false,
            quantityPurchased: 0
          };
        });

        commit('setItems', items);
        saveItemsToLocalStorage(items);
      }
    },
    loadFilterState({ commit }) {
      const filters = getFiltersFromLocalStorage();
      if (filters) {
        commit('setSort', filters.currentSort || 'byIncreasing');
        commit('setMaterial', filters.currentMaterial || 'all');
      }
    }
  },
  getters: {
    sortedAndFilteredItems(state: State) {
      let filteredItems = state.items;

      if (state.currentMaterial.value !== 'all') {
        filteredItems = filteredItems.filter(
          item => item.materialName === state.currentMaterial.value
        );
      }

      if (state.currentSort.value === 'byIncreasing') {
        return filteredItems.sort((a, b) => a.price.current_price - b.price.current_price);
      } else if (state.currentSort.value === 'byDecreasing') {
        return filteredItems.sort((a, b) => b.price.current_price - a.price.current_price);
      }

      return filteredItems;
    }
  }
});
