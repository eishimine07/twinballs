import { onKeyStroke } from '@vueuse/core'
import { useBoardStore } from '@/stores/useBoardStore'

export function useKeyboard() {
  const { moveDown, moveLeft, moveRight, moveUp } = useBoardStore()
  
  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    moveDown()
  }, { dedupe: true })
  
  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    moveLeft()
  }, { dedupe: true })
  
  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    moveRight()
  }, { dedupe: true })

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    moveUp()
  }, { dedupe: true })
}