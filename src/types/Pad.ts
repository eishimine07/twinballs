import type { BoardElement } from '@/types/BoardElement'

export type Pad = BoardElement & {
  type: PadType
}

export enum PadType {
  FAST = 'FAST',
  REVERSE = 'REVERSE',
  WIN = 'WIN'
}
