<script setup lang="ts">
import { watch } from 'vue'
import { formatTime } from '@/helpers/TimeHelper'
import { useBoardStore } from '@/stores/useBoardStore'
import { useTimerStore } from '@/stores/useTimerStore'

const boardStore = useBoardStore()
const timerStore = useTimerStore()

watch(
  () => boardStore.levelCompleted,
  () => {
    if (boardStore.levelCompleted) {
      timerStore.stop()
    }
  }
)
</script>

<template>
  <div class="p-8 bg-black text-center text-2xl">
    {{ formatTime(timerStore.seconds) }}
  </div>
</template>
