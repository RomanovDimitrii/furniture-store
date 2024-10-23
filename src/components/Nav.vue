<script setup lang="ts">
defineOptions({
  name: 'Nav'
});
</script>

<template>
  <nav class="nav">
    <ul class="nav__container">
      <li class="nav__item"><a class="nav__link" href="">Главная</a>/</li>
      <li class="nav__item"><a class="nav__link" href="">Системы хранения</a>/</li>
      <li class="nav__item">
        <a class="nav__link nav__link_active" href="">Комплекты стеллажных систем</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
}

.nav__container {
  display: flex;
  flex-direction: row;
  padding: 0;

  list-style-type: none;
}

.nav__item {
  text-decoration: none;
  padding: 0;
  margin: 0 10px;
  color: #888888;
}

.nav__item:first-of-type {
  margin: 0 10px 0 0;
}

.nav__link {
  text-decoration: none;
  color: #888888;
  margin: 0 10px 0 0;
}

.nav__link_active {
  color: #000;
}
</style>
