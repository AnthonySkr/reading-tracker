<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { toRaw } from 'vue'

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

  const stored = localStorage.getItem('myFictions')
  const fictions: Fiction[] = stored ? JSON.parse(stored) : []

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

  // Save back to LocalStorage
  localStorage.setItem('myFictions', JSON.stringify(fictions))
  resetForm()
  emit('saved')
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
