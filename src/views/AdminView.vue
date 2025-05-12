<script setup lang="ts">
// Admin page: for adding/editing fictions

import { ref } from 'vue'

// Importing components
import FictionForm from '@/components/admin/FictionForm.vue'
import FictionList from '@/components/admin/FictionList.vue'

interface Fiction {
  id: number
  title: string
  author: string
  description: string
  platform: string
  platformUrl?: string
  rating?: number
  comment?: string
}

// State to control which component is visible
const currentView = ref<'form' | 'list'>('form')
const fictionToEdit = ref<Fiction | null>(null)

// Function to start editing a fiction
function editFiction(fiction: Fiction) {
  currentView.value = 'form'
  fictionToEdit.value = fiction
}

// Function to clear edit mode after saving
function clearEdit() {
  fictionToEdit.value = null
}

// Function to handle the @saved event
function handleSaved() {
  clearEdit()
  currentView.value = 'list'
}
</script>

<template>
  <div>
    <h1>Admin - Add your fictions 📚</h1>

    <div class="nav-buttons">
      <button :class="{ active: currentView === 'form' }" @click="currentView = 'form'">
        ➕ Add Fiction
      </button>
      <button :class="{ active: currentView === 'list' }" @click="currentView = 'list'">
        📋 View Fictions
      </button>
    </div>

    <FictionForm v-if="currentView === 'form'" :edit-fiction="fictionToEdit" @saved="handleSaved" />
    <FictionList v-if="currentView === 'list'" @edit="editFiction" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

.nav-buttons {
  margin-bottom: 20px;

  button {
    background: #e0e7ff;
    border: 1px solid #c7d2fe;
    padding: 8px 16px;
    margin-right: 8px;
    border-radius: 4px;
    cursor: pointer;

    &.active {
      background-color: main.$primary-color;
      color: white;
    }

    &:hover {
      background-color: color.scale(main.$primary-color, $lightness: -10%);
    }
  }
}
</style>
