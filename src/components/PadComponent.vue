<script setup lang="ts">
import { getUrlByType } from '@/helpers/PadImageHelper'
import type { PadType } from '@/types/Pad'

type PadComponentProps = {
  x: number;
  y: number;
  type: PadType;
}

const { x, y, type } = defineProps<PadComponentProps>()
const url = getUrlByType(type)
</script>

<template>
  <div class="absolute h-8 w-8 z-10" :style="{ left: `${x}rem`, top: `${y}rem` }">
    <img :src="url" width="100%" height="100%">
  </div>
</template>
