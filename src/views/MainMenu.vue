<script setup lang="ts">
import { useClearLevel } from '@/composables/useClearLevel'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import { useRouter } from 'vue-router'

const globalLoadingStore = useGlobalLoadingStore()
const router = useRouter()
const goToSelectLevel = async () => {
  globalLoadingStore.isLoading = true
  await router.replace({ name: 'levels' })
}

useClearLevel()
</script>

<template>
  <h1 class="text-6xl mb-12 text-center">TWINBALLS</h1>

  <div class="flex flex-col gap-4 items-center text-2xl">
    <button
      class="transition-colors duration-300 rounded hover:bg-gray-700 font-bold text-center py-4 px-8"
      @click="goToSelectLevel"
    >
      Play
    </button>
  </div>
</template>
