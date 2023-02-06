<script setup>
defineProps({
  progressValue: Number
})
const getProgressColor = (v) => {
  return (v >= 80 ? 'bg-red-500' : 'bg-blue-500');
}
</script>
<template>
  <div class="progress">
    <div class="progress-bar" :class="getProgressColor(progressValue)" :style="{width: progressValue + '%'}"></div>
  </div>
</template>