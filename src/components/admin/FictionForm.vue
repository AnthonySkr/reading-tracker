<script setup lang="ts">
import { ref } from 'vue'

// Define a Fiction type
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

// Reactive form data
const title = ref('')
const author = ref('')
const description = ref('')
const platform = ref('')
const platformUrl = ref('')

// Function to save fiction in LocalStorage
function saveFiction() {
  // Basic validation
  if (!title.value || !author.value || !description.value || !platform.value) {
    alert('Please fill in all fields.')
    return
  }

  // Create a new fiction object
  const newFiction: Fiction = {
    id: Date.now(), // Unique ID
    title: title.value,
    author: author.value,
    description: description.value,
    platform: platform.value,
    platformUrl: platformUrl.value || '',
  }

  // Retrieve current fictions from LocalStorage
  const stored = localStorage.getItem('myFictions')
  const fictions: Fiction[] = stored ? JSON.parse(stored) : []

  // Add new fiction
  fictions.push(newFiction)

  // Save back to LocalStorage
  localStorage.setItem('myFictions', JSON.stringify(fictions))

  // Rest form
  title.value = ''
  author.value = ''
  description.value = ''
  platform.value = ''
  platformUrl.value = ''

  alert('Fiction saved successfully!')
}
</script>

<template>
  <form @submit.prevent="saveFiction">
    <label>
      Title*:<br />
      <input v-model="title" type="text" required /> </label
    ><br /><br />

    <label>
      Author*:<br />
      <input v-model="author" type="text" required /> </label
    ><br /><br />

    <label>
      Description*:<br />
      <textarea v-model="description" required></textarea></label
    ><br /><br />

    <label>
      Platform*:<br />
      <input v-model="platform" type="text" required /> </label
    ><br /><br />

    <label>
      Platform URL (optional):<br />
      <input v-model="platformUrl" type="url" /> </label
    ><br /><br />

    <button type="submit">Add Fiction</button>
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
