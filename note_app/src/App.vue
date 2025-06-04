<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1>NoteEase</h1>
  </header>

  <RouterView />
</template>

<style>
:root {
  --primary-color: #4A90E2;
  --secondary-color: #FFFFFF;
  --accent-color: #F5A623;
}

body {
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.app-header {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>
