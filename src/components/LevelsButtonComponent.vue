<script setup lang="ts">
import { useRouter } from 'vue-router'
 
const router = useRouter()
const gotToLevels = async () => {
  await router.replace({ name: 'levels' })
}
</script>

<template>
  <button class="transition-all duration-300 rounded border-white hover:bg-gray-700 text-white font-bold text-center py-4 px-8" @click="gotToLevels">
    Levels
  </button>
</template>
