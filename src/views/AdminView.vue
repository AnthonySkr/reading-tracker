<script setup lang="ts">
// Admin page: for adding/editing fictions

// Imports
import { ref } from 'vue'

// Importing types
import type { Fiction } from '@/types/fiction'

// Importing components
import FictionForm from '@/components/admin/FictionForm.vue'
import FictionList from '@/components/admin/FictionList.vue'
import NavButtons from '@/components/common/NavButtons.vue'

// State to control which component is visible
const currentView = ref<'form' | 'list'>('list')

// Function to edit a fiction
const fictionToEdit = ref<Fiction | null>(null)

function editFiction(fiction: Fiction) {
  currentView.value = 'form'
  fictionToEdit.value = fiction
}

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

    <NavButtons
      :current-view="currentView"
      :views="[
        { key: 'list', label: '📋 View Fictions' },
        { key: 'form', label: '➕ Add Fiction' },
      ]"
      @updateView="currentView = $event"
    />

    <FictionForm v-if="currentView === 'form'" :edit-fiction="fictionToEdit" @saved="handleSaved" />
    <FictionList v-if="currentView === 'list'" @edit="editFiction" />
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 20px;
}
</style>
