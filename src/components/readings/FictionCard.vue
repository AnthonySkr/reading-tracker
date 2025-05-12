<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Importing types
import type { Fiction } from '@/types/fiction'

const props = defineProps<{ fiction: Fiction }>()

// Local reactive fields for rating and comment
const rating = ref(props.fiction.rating || 0)
const comment = ref(props.fiction.comment || '')

// Update LocalStorage when rating or comment changes
watch([rating, comment], saveUpdates)

function saveUpdates() {
  const stored = localStorage.getItem('myFictions')
  const fictions: Fiction[] = stored ? JSON.parse(stored) : []

  const index = fictions.findIndex((f) => f.id === props.fiction.id)
  if (index !== -1) {
    fictions[index].rating = rating.value
    fictions[index].comment = comment.value
    localStorage.setItem('myFictions', JSON.stringify(fictions))
  }
}
</script>

<template>
  <div class="card">
    <h2>{{ fiction.title }}</h2>
    <p><strong>Author:</strong> {{ fiction.author }}</p>
    <p><strong>Description</strong> {{ fiction.description }}</p>
    <p>
      <strong>Plateforme:</strong>
      <a v-if="fiction.platformUrl" :href="fiction.platformUrl" target="_blank">{{
        fiction.platform
      }}</a>
      <span v-else>{{ fiction.platform }}</span>
    </p>

    <div class="rating">
      <label>Rating:</label>
      <select v-model="rating">
        <option value="0">No rating</option>
        <option v-for="n in 5" :value="n">{{ n }} ⭐</option>
      </select>
    </div>

    <div class="comment">
      <label>Comment:</label>
      <textarea v-model="comment" placeholder="Your comment..."></textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;

.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 5px #ccc;
  margin-bottom: 20px;

  h2 {
    color: main.$primary-color;
  }

  a {
    color: main.$primary-color;
  }

  .rating,
  .comment {
    margin-top: 10px;
  }

  select,
  textarea {
    width: 100%;
    padding: 6px;
    margin-top: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    height: 60px;
  }
}
</style>
