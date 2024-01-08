<script setup lang="ts">
type BlockComponenttProps = {
  left: string
  top: string
}

const { left, top } = defineProps<BlockComponenttProps>()
</script>

<template>
  <div class="absolute h-8 w-8 z-10" :style="{ left, top }">
    <img src="/images/block_1.png" width="100%" height="100%" />
  </div>
</template>
