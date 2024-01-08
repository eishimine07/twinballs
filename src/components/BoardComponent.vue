<script setup lang="ts">
import BlockComponent from '@/components/BlockComponent.vue'
import { getBlocksForBoardEdge } from '@/helpers/BoardHelper'
</script>

<template>
  <div class="relative">
    <BlockComponent v-for="(block, index) in getBlocksForBoardEdge()" v-bind:key="`board__block-${block.type}--${index}`" :left="`${block.position.x}rem`" :top="`${block.position.y}rem`" />
    <slot />
  </div>
</template>
