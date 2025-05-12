<script setup lang="ts">
// Define the props for the component
const props = defineProps<{
  currentView: string
  views: { key: string; label: string }[]
}>()

// Events: updateView: button clicked, pass the selected view's key
const emit = defineEmits(['updateView'])
</script>

<template>
  <div class="nav-buttons">
    <!-- Loop through the views array to create a button for each view -->
    <button
      v-for="view in views"
      :key="view.key"
      :class="{ active: currentView === view.key }"
      @click="emit('updateView', view.key)"
    >
      {{ view.label }}
    </button>
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
