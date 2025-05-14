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
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: main.$primary-color;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  tr {
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  td {
    font-size: 0.95rem;

    a {
      color: main.$primary-color;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: color.scale(#3b82f6, $lightness: -10%);
    transform: translateY(-2px);
  }

  &.delete {
    background-color: #ef4444;

    &:hover {
      background-color: color.scale(#ef4444, $lightness: -10%);
    }
  }
}

p {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-top: 20px;
}
</style>
