import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  let timer: NodeJS.Timeout
  const seconds = ref<number>(0)

  function start(): void {
    if (timer) {
      clearInterval(timer)
    }

    timer = setInterval(() => seconds.value++, 1_000)
  }

  function stop(): void {
    clearInterval(timer)
  }

  function $reset(): void {
    seconds.value = 0
    clearInterval(timer)
  }

  return { seconds: readonly(seconds), start, stop, $reset }
})
