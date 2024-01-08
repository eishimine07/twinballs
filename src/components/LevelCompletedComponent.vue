<script setup lang="ts">
import LevelsButtonComponent from '@/components/LevelsButtonComponent.vue'
import MainMenuButtonComponent from '@/components/MainMenuButtonComponent.vue'
import NextLevelButtonComponent from '@/components/NextLevelButtonComponent.vue'
import { useBoardStore } from '@/stores/useBoardStore'

const boardStore = useBoardStore()
</script>

<template>
  <Transition>
    <div v-if="boardStore.levelCompleted" class="absolute flex items-center justify-center z-30 w-full h-full top-0 left-0 bg-black bg-opacity-60">
      <div class="bg-black w-80 px-16 py-8 border-2 border-solid border-white rounded">
        <h3 class="text-4xl text-center">Completed!</h3>
    
        <div class="flex flex-col gap-4 justify-center w-full mt-8">
          <NextLevelButtonComponent />

          <LevelsButtonComponent />
    
          <MainMenuButtonComponent />
        </div>
    
        <slot />
      </div>
    </div>
  </Transition>
</template>
