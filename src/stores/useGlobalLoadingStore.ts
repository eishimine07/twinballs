import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalLoadingStore = defineStore('globalLoading', () => {
  const isLoading = ref<boolean>(false)

  return { isLoading }
})
