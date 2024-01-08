import { useBoardStore } from '@/stores/useBoardStore'
import { useGlobalLoadingStore } from '@/stores/useGlobalLoadingStore'
import { useTimerStore } from '@/stores/useTimerStore'

export function useRestartLevel(): void {
  const globalLoadingStore = useGlobalLoadingStore()
  const boardStore = useBoardStore()
  const timerStore = useTimerStore()
  const TIMEOUT = 1_000

  globalLoadingStore.isLoading = true
  boardStore.$reset()
  timerStore.$reset()

  setTimeout(() => {
    globalLoadingStore.isLoading = false
    timerStore.start()
  }, TIMEOUT)
}