<script setup lang="ts">
import { useBoardStore } from '@/stores/useBoardStore'
import { Effect } from '@/types/TwinBall';
import { computed } from 'vue'

type TwinBallComponentProps = {
  index: 1 | 2
}

const props = defineProps<TwinBallComponentProps>()
const boardStore = useBoardStore()
const state = computed(() => props.index === 1 ? boardStore.twinBallOne : boardStore.twinBallTwo)
const color = computed(() => {
  switch (state.value.effect) {
    case Effect.FAST:
      return 'bg-gradient-to-r from-red-800 to-red-400 animate-spin'
    case Effect.REVERSE:
      return 'bg-gradient-to-r from-teal-800 to-teal-400 animate-spin'
    default:
      return 'bg-white'
  }
})
</script>

<template>
  <div class="absolute h-8 w-8 rounded-2xl z-20 transition-all duration-300" :class="color" :style="{ left: `${state.position.x}rem`, top: `${state.position.y}rem` }" />
</template>
