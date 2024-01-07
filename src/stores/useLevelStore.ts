import { defineStore } from 'pinia'
import { computed, readonly, shallowRef } from 'vue'
import levelService from '@/services/levelService'
import type { Level } from '@/types/level'

export const useLevelStore = defineStore('level', () => {
  const levels = levelService().getLevels()
  const currentLevel = shallowRef<Level>({ enabled: false, id: 0 })
  const nextLevel = computed<Level | null>(() => currentLevel.value !== null ? levelService().getNextLevel(currentLevel.value) : null)

  function setLevel(level: Pick<Level, 'id'>): void {
    const selectedLevel = levels.find((l) => l.id === level.id)

    if (!selectedLevel) {
      return
    }

    currentLevel.value = selectedLevel
  }

  function $reset(): void {
    currentLevel.value = { enabled: false, id: 0 }
  }

  return { currentLevel: readonly(currentLevel), levels, nextLevel, setLevel, $reset }
})