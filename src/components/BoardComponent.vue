<script setup lang="ts">
import { useBoardStore } from '@/stores/useBoardStore'
import BlockComponent from './BlockComponent.vue';

const { blocks } = useBoardStore();
</script>

<template>
  <div class="relative">
    <BlockComponent v-for="(block, index) in blocks" v-bind:key="`block-${block.type}--${index}`" :left="block.position.x_px" :top="block.position.y_px" />
    <slot />
  </div>
</template>
