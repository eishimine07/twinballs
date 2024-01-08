<script setup lang="ts">
import { RouterView } from 'vue-router'
import ContainerComponent from '@/components/ContainerComponent.vue'
import IconLoading from '@/components/icons/IconLoading.vue'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'

const globalLoadingStore = useGlobalLoadingStore()
</script>

<template>
  <ContainerComponent>
    <RouterView />

    <div
      v-if="globalLoadingStore.isLoading"
      class="absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center z-50 bg-black bg-opacity-90 text-white text-lg"
    >
      <IconLoading class="size-12" />
      Loading...
    </div>
  </ContainerComponent>
</template>
