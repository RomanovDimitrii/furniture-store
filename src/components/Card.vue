<script setup lang="ts">
import { useStore } from 'vuex';

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
  materialName: string;
  isLiked: boolean;
  quantityPurchased: number;
}

defineOptions({
  name: 'Card'
});

const props = defineProps<{ item: Item }>();

const store = useStore();

const toggleLikeItem = () => {
  store.commit('toggleItemLiked', props.item.id);
};

const togglePurchaseItem = () => {
  if (props.item.quantityPurchased) {
    store.commit('updateItemQuantityPurchased', { itemId: props.item.id, quantity: 0 });
  } else {
    store.commit('updateItemQuantityPurchased', { itemId: props.item.id, quantity: 1 });
  }
};
</script>

<template>
  <li class="card">
    <div class="card__gap">
      <p v-show="item.price.old_price !== null" class="card__discount">Скидка</p>
    </div>
    <img class="card__img" :src="item.image.url" :alt="item.name" />
    <p class="card__code">{{ item.code }}</p>
    <p v-if="item.code === null" class="card__code"></p>
    <h2 class="card__name">{{ item.name }}</h2>
    <div class="card__bottom-block">
      <div class="card__price-block">
        <span v-if="item.price.old_price !== null" class="card__price card__price_old"
          >{{ Math.round(item.price.old_price) }}&#8381;</span
        >
        <span class="card__price">{{ Math.round(item.price.current_price) }}&#8381;</span>
      </div>
      <div class="card__actions-block">
        <img
          class="card__icon"
          :src="item.isLiked ? '/src/pic/liked-icon.png' : '/src/pic/unliked-icon.png'"
          :alt="item.isLiked ? 'исключить из избранного' : 'добавить в избранное'"
          @click="toggleLikeItem"
        />

        <img
          class="card__icon"
          :src="
            item.quantityPurchased ? '/src/pic/added-to-cart-icon.png' : '/src/pic/cart-icon.png'
          "
          :alt="item.quantityPurchased ? 'удалить из корзины' : 'добавить в корзину'"
          @click="togglePurchaseItem"
        />
      </div>
    </div>
  </li>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eeeeee;
}

.card__gap {
  display: block;
  height: 24px;
  width: 81px;
  margin: 8px 0 0;
}
.card__discount {
  background-color: #eb5757;
  margin: 0;
  padding: 0;
  text-align: center;
}
.card__img {
  width: 238px;
  object-fit: contain;
  align-self: center;
}

.card__code {
  margin: 6px 0 6px 12px;
  font-size: 0.625rem;
  color: #888888;
  letter-spacing: 2%;
  line-height: 14px;
  text-transform: uppercase;
}
.card__name {
  font-size: 1rem;
  letter-spacing: 2%;
  font-weight: 500;
  margin: 0 0 10px 12px;
}

.card__bottom-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 9px 20px 10px 12px;
}

.card__price-block {
  display: flex;
}

.card__price {
  font-size: 1rem;
  letter-spacing: 2%;
  font-weight: 400;
  margin: 0;
}

.card__price_old {
  color: #888888;
  text-decoration: line-through;
  margin: 0 9px 0 0;
}

.card__actions-block {
  display: flex;
  flex-direction: row;
  column-gap: 8px;
}

.card__icon {
  width: 19.8px;
  object-fit: contain;
}

.card__icon_cart {
  width: 18.1px;
}
</style>
