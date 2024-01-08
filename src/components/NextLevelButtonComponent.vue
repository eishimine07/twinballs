<script setup lang="ts">
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import { useLevelStore } from '@/stores/useLevelStore'
import { useRouter } from 'vue-router'

const levelStore = useLevelStore()
const globalLoadingStore = useGlobalLoadingStore()
const router = useRouter()

const goToNextLevel = async () => {
  const nextLevel = levelStore.nextLevel

  if (nextLevel.id) {
    globalLoadingStore.isLoading = true
    await router.replace({ name: 'game', params: { id: nextLevel.id } })
    levelStore.setLevel(nextLevel)
  }
}
</script>

<template>
  <button
    v-if="levelStore.hasNextLevel"
    class="transition-colors duration-300 rounded hover:bg-gray-700 font-bold text-center py-4 px-8"
    @click="goToNextLevel"
  >
    Next Level
  </button>
</template>
