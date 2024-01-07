import { useBoardStore } from '@/stores/useBoardStore'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import { useLevelStore } from '@/stores/useLevelStore'
import { useTimerStore } from '@/stores/useTimerStore'
import { onBeforeMount, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const TIMEOUT = 1_000

export function useSetLevel(route: RouteLocationNormalizedLoaded) {
  const levelStore = useLevelStore()
  const boardStore = useBoardStore()
  const timerStore = useTimerStore()
  const globalLoadingStore = useGlobalLoadingStore() 

  onBeforeMount(() => {
    const levelId = route.params.id

    if (levelId) {
      levelStore.setLevel({ id: parseInt(levelId.toString()) })
    }
  })

  watch(
    () => levelStore.currentLevel,
    () => {
      boardStore.$reset()
      timerStore.$reset()

      setTimeout(() => {
        globalLoadingStore.isLoading = false
        timerStore.start()
      }, TIMEOUT)
    },
  )
}