import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import levelService from '@/services/levelService'
import type { Level } from '@/types/Level'

export const useLevelStore = defineStore('level', () => {
  const levels = levelService().getLevels()
  const currentLevel = ref<Level>({
    enabled: false,
    id: '',
    pads: [],
    twin_balls: [],
    blocks: [],
    winning_positions: []
  })
  const nextLevel = computed<Level>(() => {
    const nextLevel = {
      enabled: false,
      id: '',
      pads: [],
      twin_balls: [],
      blocks: [],
      winning_positions: []
    }

    if (currentLevel.value !== null) {
      return levelService().getNextLevel(currentLevel.value) ?? nextLevel
    }

    return nextLevel
  })
  const hasNextLevel = computed<boolean>(() => !!nextLevel.value.id)

  function setLevel(level: Pick<Level, 'id'>): void {
    const selectedLevel = levels.find((l) => l.id === level.id)

    if (!selectedLevel) {
      return
    }

    currentLevel.value = { ...selectedLevel }
  }

  function getInitialState(): Pick<
    Level,
    'blocks' | 'pads' | 'twin_balls' | 'winning_positions'
  > | null {
    const currentLevelState = levels.find((l) => l.id === currentLevel.value.id)

    if (currentLevelState !== undefined) {
      return { ...currentLevelState }
    }

    return null
  }

  function $reset(): void {
    currentLevel.value = {
      enabled: false,
      id: '',
      pads: [],
      twin_balls: [],
      blocks: [],
      winning_positions: []
    }
  }

  return {
    $reset,
    currentLevel: readonly(currentLevel),
    getInitialState,
    hasNextLevel,
    levels,
    nextLevel,
    setLevel
  }
})
