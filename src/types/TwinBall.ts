import type { BoardElement } from '@/types/BoardElement'

export type TwinBall = BoardElement & {
  effect: Effect
}

export enum Effect {
  FAST = 'FAST',
  NONE = 'NONE',
  REVERSE = 'REVERSE'
}
