<script setup lang="ts">
import { useClearLevel } from '@/composables/useClearLevel'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import { useLevelStore } from '@/stores/useLevelStore'
import type { Level } from '@/types/Level'
import { useRouter } from 'vue-router'

const levelStore = useLevelStore()
const globalLoadingStore = useGlobalLoadingStore()
const router = useRouter()

// globalLoadingStore.isLoading = true
globalLoadingStore.isLoading = false

const useGoToLevel = async (level: Level) => {
  globalLoadingStore.isLoading = true
  await router.replace({ name: 'game', params: { id: level.id } })
  levelStore.setLevel({ id: level.id })
}

useClearLevel()
</script>

<template>
  <h2 class="text-5xl mb-8 text-center">Select Level</h2>

  <div class="flex flex-wrap gap-8 p-4">
    <button
      v-for="level in levelStore.levels"
      v-bind:key="`level--${level.id}`"
      class="size-32 bg-red-700 hover:bg-red-500 disabled:bg-red-950 transition-colors duration-300 disabled:cursor-not-allowed text-2xl font-bold"
      :disabled="!level.enabled"
      @click="useGoToLevel(level)"
    >
      {{ level.name ?? level.index }}
    </button>
  </div>
</template>
