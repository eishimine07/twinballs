import { useBoardStore } from '@/stores/useBoardStore'
import { useLevelStore } from '@/stores/useLevelStore'
import { useTimerStore } from '@/stores/useTimerStore'
import { onBeforeMount, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function useSetLevel(route: RouteLocationNormalizedLoaded) {
  const levelStore = useLevelStore()
  const boardStore = useBoardStore()
  const timerStore = useTimerStore()

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
      timerStore.start()
    },
  )
}