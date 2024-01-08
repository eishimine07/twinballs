<script setup lang="ts">
import { useBoardStore } from '@/stores/useBoardStore'
import { computed } from 'vue'

type TwinBallComponentProps = {
  index: 1 | 2
}

const props = defineProps<TwinBallComponentProps>()
const boardStore = useBoardStore()
const state = computed(() => props.index === 1 ? boardStore.twinBallOne : boardStore.twinBallTwo)
</script>

<template>
  <div class="absolute h-8 w-8 rounded-2xl z-20 bg-white transition-all duration-300" :style="{ left: `${state.position.x}rem`, top: `${state.position.y}rem` }" />
</template>
