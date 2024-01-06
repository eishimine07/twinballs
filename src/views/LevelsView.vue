<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLevelStore } from '@/stores/useLevelStore'
import type { Level } from '@/types/level'
import { useResetLevel } from '@/composables/useResetLevel'

const levelStore = useLevelStore()
const router = useRouter()

const useGoToLevel = async (level: Level) => {
  await router.replace({ name: 'game', params: { id: level.id }})
  levelStore.setLevel({ id: level.id })
}

useResetLevel()
</script>

<template>
  <h2 class="text-5xl mb-8 text-center">
    Select Level
  </h2>

  <div class="flex flex-wrap gap-8 p-4">
    <button v-for="level in levelStore.levels" v-bind:key="`level--${level.id}`" class="size-32 bg-red-700 hover:bg-red-500 disabled:bg-red-950 transition-colors duration-300 disabled:cursor-not-allowed text-2xl font-bold" :disabled="!level.enabled" @click="useGoToLevel(level)">
      {{ level.name ?? level.index }}
    </button>
  </div>
</template>
