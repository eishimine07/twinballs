<script setup lang="ts">
import { useRestartLevel } from '@/composables/useRestartLevel'
</script>

<template>
  <button class="transition-all duration-300 rounded border-white hover:bg-gray-700 text-white font-bold text-center py-4 px-8" @click="useRestartLevel">
    Restart
  </button>
</template>
