<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Importing components
import FictionCard from '@/components/readings/FictionCard.vue'

// Importing types
import type { Fiction } from '@/types/fiction'

const fictions = ref<Fiction[]>([])

function loadFictions() {
  const stored = localStorage.getItem('myFictions')
  fictions.value = stored ? JSON.parse(stored) : []
}

onMounted(() => {
  loadFictions()
})
</script>

<template>
  <div>
    <h1>Your Fiction Library 📖</h1>

    <div v-if="fictions.length > 0">
      <FictionCard v-for="fic in fictions" :key="fic.id" :fiction="fic" />
    </div>
    <p v-else>No fictions added yet. Go to Admin to add some! 🛠️</p>
  </div>
</template>

<style scoped lang="scss"></style>
