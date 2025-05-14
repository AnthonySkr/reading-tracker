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
const imageUrl = ref('')

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
      imageUrl.value = newVal.imageUrl || ''
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
  imageUrl.value = ''
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
        imageUrl: imageUrl.value || '',
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
      imageUrl: imageUrl.value || '',
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
      Title:
      <input v-model="title" type="text" required />
    </label>

    <label>
      Author:
      <input v-model="author" type="text" required />
    </label>

    <label>
      Description:
      <textarea v-model="description" required></textarea>
    </label>

    <label>
      Platform:
      <input v-model="platform" type="text" required />
    </label>

    <label>
      Platform URL (optional):
      <input v-model="platformUrl" type="url" />
    </label>

    <label>
      Image URL (optional):
      <input v-model="imageUrl" type="url" />
    </label>

    <button type="submit">{{ isEditing ? 'Save Changes' : 'Add Fiction' }}</button>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

form {
  max-width: 600px;
  margin: 0 auto;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;

  h2 {
    margin-bottom: 20px;
    color: main.$primary-color;
    font-size: 1.8rem;
    text-align: center;
  }

  h2::before {
    content: '📚 ';
    color: main.$primary-color;
    font-size: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 15px;
    margin-right: 15px;
    font-weight: bold;
    color: #333;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    &:focus {
      border-color: main.$primary-color;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      outline: none;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button {
    display: block;
    width: 100%;
    background-color: main.$primary-color;
    color: white;
    padding: 12px;
    border: none;
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
  }

  input,
  textarea,
  button {
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
}
</style>
