<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const gotToLevels = async () => {
  await router.replace({ name: 'levels' })
}
</script>

<template>
  <button
    class="transition-colors duration-300 rounded hover:bg-gray-700 font-bold text-center py-4 px-8"
    @click="gotToLevels"
  >
    Levels
  </button>
</template>
