<script setup lang="ts">
import LevelsButtonComponent from '@/components/LevelsButtonComponent.vue'
import MainMenuButtonComponent from '@/components/MainMenuButtonComponent.vue'
import NextLevelButtonComponent from '@/components/NextLevelButtonComponent.vue'
import { useBoardStore } from '@/stores/useBoardStore'
import { useTimerStore } from '@/stores/useTimerStore'

const boardStore = useBoardStore()
const timerStore = useTimerStore()
</script>

<template>
  <Transition>
    <div v-if="boardStore.levelCompleted" class="absolute flex items-center justify-center z-30 w-full h-full top-0 left-0 bg-black bg-opacity-60">
      <div class="bg-black w-80 px-16 py-8 border-2 border-solid border-white rounded">
        <h3 class="text-4xl text-center mb-4">Completed!</h3>

        <p class="text-lg text-center">{{ `Your time was ${timerStore.seconds}s` }}</p>
    
        <div class="flex flex-col justify-center w-full mt-4">
          <NextLevelButtonComponent />

          <LevelsButtonComponent />
    
          <MainMenuButtonComponent />
        </div>
    
        <slot />
      </div>
    </div>
  </Transition>
</template>
