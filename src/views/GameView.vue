<script setup lang="ts">
import BallComponent from '@/components/BallComponent.vue'
import BoardComponent from '@/components/BoardComponent.vue'
import LevelCompletedComponent from '@/components/LevelCompletedComponent.vue'
import PadComponent from '@/components/PadComponent.vue'
import { useBoardStore } from '@/stores/useBoardStore'
import { useKeyboard } from '@/composables/useKeyboard'
import { useRoute } from 'vue-router'
import { useSetLevel } from '@/composables/useSetLevel'
import TimerComponent from '@/components/TimerComponent.vue'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'

const route = useRoute()
const { pads } = useBoardStore()
const globalLoadingStore = useGlobalLoadingStore()

globalLoadingStore.isLoading = true

useSetLevel(route)
useKeyboard()
</script>

<template>
  <div class="grid grid-cols-12 mx-4 gap-4">
    <h4 class="col-span-12 text-3xl text-center">Level {{ route.params.id }}</h4>

    <BoardComponent class="col-span-9" id="board-component">
      <BallComponent :index="1" />
  
      <BallComponent :index="2" />
  
      <PadComponent v-for="(pad, index) in pads" v-bind:key="`pad-${pad.type}--${index}`" :left="pad.position.x_px" :top="pad.position.y_px" :type="pad.type" />
    </BoardComponent>
  
    <TimerComponent class="col-span-3" />
  </div>

  <LevelCompletedComponent />
</template>
