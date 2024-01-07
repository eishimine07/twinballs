import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  let timer: NodeJS.Timeout | null = null
  const seconds = ref<number>(0)

  function start(): void {
    if (!timer) {
      timer = setInterval(() => seconds.value++, 1_000)
    }
  }

  function stop(): void {
    if (timer) {
      clearInterval(timer)
    }
  }

  function $reset(): void {
    seconds.value = 0
    timer = null
  }

  return { seconds: readonly(seconds), start, stop, $reset }
})