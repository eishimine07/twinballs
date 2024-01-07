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
  <div class="py-4 px-8 border border-solid border-white bg-black text-center text-lg">
    {{ formatTime(timerStore.seconds) }}
  </div>
</template>
