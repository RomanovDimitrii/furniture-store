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

const addedToCartIcon = new URL('@/pic/added-to-cart-icon.png', import.meta.url).href;
const cartIcon = new URL('@/pic/cart-icon.png', import.meta.url).href;
const likedIcon = new URL('@/pic/liked-icon.png', import.meta.url).href;
const unlikedIcon = new URL('@/pic/unliked-icon.png', import.meta.url).href;

const cardImage = new URL(`../pic/${props.item.image.url}`, import.meta.url).href;

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
    <p v-show="item.price.old_price !== null" class="card__discount">Скидка</p>

    <img class="card__img" :src="cardImage" :alt="item.name" />
    <div class="card__text-wrapper">
      <p v-if="item.code !== null" class="card__code">{{ item.code }}</p>
    </div>

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
        <button class="card__button" @click="togglePurchaseItem">
          <img
            class="card__icon"
            :src="item.quantityPurchased ? addedToCartIcon : cartIcon"
            :alt="item.quantityPurchased ? 'удалить из корзины' : 'добавить в корзину'"
          />
        </button>
        <button class="card__button" @click="toggleLikeItem">
          <img
            class="card__icon"
            :src="item.isLiked ? likedIcon : unlikedIcon"
            :alt="item.isLiked ? 'исключить из избранного' : 'добавить в избранное'"
          />
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eeeeee;
  position: relative;
}

.card__discount {
  background-color: #eb5757;
  margin: 0;
  padding: 4px 15px;
  top: 23px;
  text-align: center;
  color: #fff;
  font-family: 'SFProDisplay';
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 2;
  position: absolute;
}
.card__img {
  margin: 27px 0 22px;
  width: 238px;
  object-fit: contain;
  align-self: center;
}

.card__text-wrapper {
  display: block;
  height: 0.625rem;
  margin: 0px 0 11px 12px;
}

.card__code {
  margin: 0;
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
  margin: 0 0 6px 12px;
}

.card__bottom-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 7px 16px 10px 12px;
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
  margin: 0 8px 0 0;
}

.card__actions-block {
  display: flex;
  flex-direction: row;
  column-gap: 11px;
}

.card__button {
  display: flex;
  border: none;
  background-color: transparent;
}

.card__button:hover {
  cursor: pointer;
  opacity: 0.5;
}
.card__icon {
  width: 19.8px;
  height: 19.8px;
  object-fit: contain;
}

.card__icon_cart {
  width: 18.1px;
}
</style>
