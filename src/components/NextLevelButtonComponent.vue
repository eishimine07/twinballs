<script setup lang="ts">
import { useLevelStore } from '@/stores/useLevelStore'
import { useRouter } from 'vue-router'
 
const levelStore = useLevelStore()
const router = useRouter()

const goToNextLevel = async () => {
  const nextLevel = levelStore.nextLevel

  if (nextLevel) {
    await router.replace({ name: 'game', params: { id: nextLevel.id }})
    levelStore.setLevel(nextLevel)
  }
}
</script>

<template>
  <button class="transition-all duration-300 rounded border-white hover:bg-gray-700 text-white font-bold text-center py-4 px-8" @click="goToNextLevel">
    Next Level
  </button>
</template>
