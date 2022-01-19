<script setup>
import Lists from './components/Lists.vue'
</script>

<template>
  <div class="main_page">
    <div class="header">
      <div class="container mx-auto">
        <a href="/"><h1 class="py-4 text-3xl">NodeQuery</h1></a>
      </div>
    </div>
    <div class="container mx-auto py-8">
      <Lists />
    </div>
  </div>
</template>
