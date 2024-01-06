<script setup lang="ts">
import type { PadType } from '@/stores/useBoardStore'
import { getUrlByType } from '@/helpers/PadImageHeper'


type PadComponentProps = {
  left: string;
  top: string;
  type: PadType;
}

const { left, top, type } = defineProps<PadComponentProps>()
const url = getUrlByType(type)
</script>

<template>
  <div class="absolute h-8 w-8 z-10" :style="{ left, top }">
    <img :src="url" width="100%" height="100%">
  </div>
</template>
