<script setup lang="ts">
import { ref } from 'vue'

// Import types
import type { Fiction } from '@/types/fiction'

// EXPORT
function exportData() {
  const data = localStorage.getItem('myFictions')
  if (!data) {
    alert('No data to export.')
    return
  }

  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'myFictions.json'
  link.click()

  URL.revokeObjectURL(url)
}

// IMPORT
function importData(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result as string)

      // Check if the parsed data is an array of Fiction objects
      if (!Array.isArray(parsed)) throw new Error('Invalid format')

      localStorage.setItem('myFictions', JSON.stringify(parsed))
      alert('Data imported successfully.')
    } catch (e) {
      alert('Error importing file. Make sure it’s a valid JSON export.')
    }
  }

  reader.readAsText(file)
}
</script>

<template>
  <div class="backup">
    <h2>📦 Backup & Restore</h2>

    <button @click="exportData">📤 Export to JSON</button>

    <label>
      📥 Import from JSON:
      <input type="file" @change="importData" accept="application/json" />
    </label>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main' as main;
@use 'sass:color';

.backup {
  background: #f9fafb;
  padding: 20px;
  margin-top: 30px;
  border-radius: 8px;
  border: 1px solid #ddd;

  h2 {
    color: main.$primary-color;
    margin-bottom: 15px;
  }

  button {
    background-color: main.$primary-color;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: color.scale(main.$primary-color, $lightness: -10%);
    }
  }

  input[type='file'] {
    margin-top: 10px;
  }
}
</style>
