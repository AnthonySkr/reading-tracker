<script setup lang="ts">
// Imports
import { ref, onMounted } from 'vue'

// Importing types
import type { Fiction } from '@/types/fiction'

import { getFictions, setFictions } from '@/utils/storage'

const fictions = ref<Fiction[]>([])

onMounted(() => {
  fictions.value = getFictions()
})

function deleteFiction(id: number) {
  const confirmed = confirm('Are you sure you want to delete this fiction?')
  if (!confirmed) return

  fictions.value = fictions.value.filter((fiction) => fiction.id !== id)
  setFictions(fictions.value)
}
</script>

<template>
  <div>
    <h2>Fiction List 📋</h2>

    <table v-if="fictions.length > 0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Platform</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fic in fictions" :key="fic.id">
          <td>{{ fic.title }}</td>
          <td>{{ fic.author }}</td>
          <td>
            <a v-if="fic.platformUrl" :href="fic.platformUrl" target="_blank">{{ fic.platform }}</a>
            <span v-else>{{ fic.platform }}</span>
          </td>
          <td>
            <a v-if="fic.imageUrl" :href="fic.imageUrl" target="_blank">Image link set</a>
            <span v-else>No image</span>
          </td>
          <td>
            <button @click="$emit('edit', fic)">✏️ Edit</button>
            <button @click="deleteFiction(fic.id)">🗑️ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No fictions added yet.</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #e0e7ff;
  }

  a {
    color: main.$primary-color;
  }

  button {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      background-color: color.scale(#ef4444, $lightness: -10%);
    }
  }
}
</style>
