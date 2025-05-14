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
import FictionBackup from '@/components/admin/FictionBackup.vue'

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

    <FictionBackup />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

div {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: main.$primary-color;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: bold;

  &::before {
    content: '📚 ';
    font-size: 1.5rem;
  }
}

.NavButtons {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  button {
    background-color: main.$primary-color;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: color.scale(main.$primary-color, $lightness: -10%);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &.active {
      background-color: color.scale(main.$primary-color, $lightness: -20%);
    }
  }
}

.FictionForm,
.FictionList,
.FictionBackup {
  margin-bottom: 30px;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
