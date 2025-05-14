<script setup lang="ts">
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

      // Reload the page to reflect changes NOT OPTIMAL
      location.reload()
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
  background: #ffffff;
  padding: 30px;
  margin-top: 30px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: main.$primary-color;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  button {
    background-color: main.$primary-color;
    color: white;
    padding: 12px 20px;
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

  label {
    display: block;
    margin-top: 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #333;

    input[type='file'] {
      display: block;
      margin: 10px auto 0;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: border-color 0.3s ease;

      &:hover {
        border-color: main.$primary-color;
      }
    }
  }

  // Add subtle animations
  h2,
  button,
  label {
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
