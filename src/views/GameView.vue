<script setup lang="ts">
import TwinBallComponent from '@/components/TwinBallComponent.vue'
import MainMenuButtonComponent from '@/components/MainMenuButtonComponent.vue'
import BoardComponent from '@/components/BoardComponent.vue'
import LevelCompletedComponent from '@/components/LevelCompletedComponent.vue'
import PadComponent from '@/components/PadComponent.vue'
import { useBoardStore } from '@/stores/useBoardStore'
import { useKeyboard } from '@/composables/useKeyboard'
import RestartLevelButtonComponent from '@/components/RestartLevelButtonComponent.vue'
import { useRoute } from 'vue-router'
import { useSetLevel } from '@/composables/useSetLevel'
import TimerComponent from '@/components/TimerComponent.vue'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import BlockComponent from '@/components/BlockComponent.vue'
import { PadType } from '@/types/Pad'
import { useLevelStore } from '@/stores/useLevelStore'
import { computed } from 'vue'

const route = useRoute()
const boardStore = useBoardStore()
const globalLoadingStore = useGlobalLoadingStore()
const levelStore = useLevelStore()
const title = computed(() => `Level - ${levelStore.currentLevel.name ?? levelStore.currentLevel.index ?? levelStore.currentLevel.id}`)

globalLoadingStore.isLoading = true

useSetLevel(route)
useKeyboard()
</script>

<template>
  <div class="grid grid-cols-12 mx-4 gap-4">
    <h4 class="col-span-12 text-3xl text-center">
      {{ title }}
    </h4>

    <BoardComponent class="col-span-9" id="board-component">
      <TwinBallComponent :index="1" />
  
      <TwinBallComponent :index="2" />

      <BlockComponent v-for="(block, index) in boardStore.blocks" v-bind:key="`block-${block.type}--${index}`" :left="`${block.position.x}rem`" :top="`${block.position.y}rem`" />
  
      <PadComponent v-for="(pad, index) in boardStore.pads" v-bind:key="`pad-${pad.type}--${index}`" :x="pad.position.x" :y="pad.position.y" :type="pad.type" />

      <PadComponent v-for="(winningPosition, index) in boardStore.winningPositions" v-bind:key="`winningPosition-${winningPosition}--${index}`" :x="winningPosition.x" :y="winningPosition.y" :type="PadType.WIN" />
    </BoardComponent>
  
    <div class="col-span-3">
      <TimerComponent class="w-full rounded border" />

      <div class="w-full flex flex-col mt-8 rounded border">
        <RestartLevelButtonComponent />

        <MainMenuButtonComponent   />
      </div>
    </div>
  </div>

  <LevelCompletedComponent />
</template>
