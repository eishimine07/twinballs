<script setup lang="ts">
import { useRestartLevel } from '@/composables/useRestartLevel'
</script>

<template>
  <button class="transition-colors duration-300 rounded hover:bg-gray-700 font-bold text-center py-4 px-8" @click="useRestartLevel">
    Restart
  </button>
</template>
