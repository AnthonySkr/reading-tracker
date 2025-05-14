<script setup lang="ts">
// Imports
import { ref, watch, computed } from 'vue'

// Importing types
import type { Fiction } from '@/types/fiction'

import { getFictions, setFictions } from '@/utils/storage'

const props = defineProps<{ editFiction: Fiction | null }>()
const emit = defineEmits(['saved'])

// Reactive form data
const title = ref('')
const author = ref('')
const description = ref('')
const platform = ref('')
const platformUrl = ref('')

// Computed to know if we are editing or adding
const isEditing = computed(() => props.editFiction !== null)

// Watch for changes on editFiction to pre-fill form
watch(
  () => props.editFiction,
  (newVal) => {
    if (newVal) {
      title.value = newVal.title
      author.value = newVal.author
      description.value = newVal.description
      platform.value = newVal.platform
      platformUrl.value = newVal.platformUrl || ''
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  title.value = ''
  author.value = ''
  description.value = ''
  platform.value = ''
  platformUrl.value = ''
}

// Function to save fiction in LocalStorage
function saveFiction() {
  // Basic validation
  if (!title.value || !author.value || !description.value || !platform.value) {
    alert('Please fill in all fields.')
    return
  }

  const fictions = getFictions()

  if (isEditing.value && props.editFiction) {
    // Edit existing
    const index = fictions.findIndex((fic) => fic.id === props.editFiction!.id)
    if (index !== -1) {
      fictions[index] = {
        ...fictions[index],
        title: title.value,
        author: author.value,
        description: description.value,
        platform: platform.value,
        platformUrl: platformUrl.value || '',
      }
    }
  } else {
    // Add new
    const newFiction: Fiction = {
      id: Date.now(), // Unique ID
      title: title.value,
      author: author.value,
      description: description.value,
      platform: platform.value,
      platformUrl: platformUrl.value || '',
    }
    fictions.push(newFiction)
  }

  // Set back to LocalStorage
  setFictions(fictions)
  resetForm()
  emit('saved')
}
</script>

<template>
  <form @submit.prevent="saveFiction">
    <h2>{{ isEditing ? 'Edit Fiction' : 'Add Fiction' }}</h2>

    <label>
      Title*:
      <input v-model="title" type="text" required />
    </label>

    <label>
      Author*:
      <input v-model="author" type="text" required />
    </label>

    <label>
      Description*:
      <textarea v-model="description" required></textarea>
    </label>

    <label>
      Platform*:
      <input v-model="platform" type="text" required />
    </label>

    <label>
      Platform URL (optional):
      <input v-model="platformUrl" type="url" />
    </label>

    <button type="submit">{{ isEditing ? 'Save Changes' : 'Add Fiction' }}</button>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

form {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px #ccc;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background-color: main.$primary-color;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: color.scale(main.$primary-color, $lightness: -10%);
  }
}
</style>
