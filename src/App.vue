<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Readings</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;

nav {
  background: #e0e7ff;
  padding: 20px;
  margin-bottom: 20px;

  a {
    margin-right: 20px;
    color: main.$primary-color;
    text-decoration: none;
    font-size: 20px;
  }

  a.router-link-exact-active {
    font-weight: bold;
  }
}

main {
  padding: 20px;
}
</style>
