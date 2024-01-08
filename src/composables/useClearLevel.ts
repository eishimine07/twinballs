import { useBoardStore } from '@/stores/useBoardStore'
import { useLevelStore } from '@/stores/useLevelStore'
import { useTimerStore } from '@/stores/useTimerStore'
import { onBeforeMount } from 'vue'

export function useClearLevel() {
  const boardStore = useBoardStore()
  const levelStore = useLevelStore()
  const timerStore = useTimerStore()

  onBeforeMount(() => {
    levelStore.$reset()
    boardStore.$reset()
    timerStore.$reset()
  })
}
