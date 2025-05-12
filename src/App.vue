<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Readings</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
nav {
  background: #e0e7ff;
  padding: 10px;
  margin-bottom: 20px;

  a {
    margin-right: 10px;
    color: main.$primary-color;
    text-decoration: none;
  }

  a.router-link-exact-active {
    font-weight: bold;
  }
}
</style>
