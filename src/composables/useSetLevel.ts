import { useLevelStore } from '@/stores/useLevelStore'
import { onBeforeMount, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRestartLevel } from './useRestartLevel'

const TIMEOUT = 1_000

export function useSetLevel(route: RouteLocationNormalizedLoaded) {
  const levelStore = useLevelStore()

  onBeforeMount(() => {
    const levelId = route.params.id

    if (levelId) {
      levelStore.setLevel({ id: levelId.toString() })
    }
  })

  watch(
    () => levelStore.currentLevel,
    () => {
      useRestartLevel()
    },
  )
}