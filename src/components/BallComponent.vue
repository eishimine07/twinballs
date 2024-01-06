<script setup lang="ts">
import { useBoardStore } from '@/stores/useBoardStore'
import { computed, watch } from 'vue';

type BallComponentProps = {
  index: 1 | 2
}

const props = defineProps<BallComponentProps>()
const boardStore = useBoardStore()
const ball = computed(() => props.index === 1 ? boardStore.ballOne : boardStore.ballTwo)
</script>

<template>
  <div class="absolute h-8 w-8 rounded-2xl z-20 bg-white transition-all duration-300" :style="{ left: ball.position.x_px, top: ball.position.y_px }" />
</template>
