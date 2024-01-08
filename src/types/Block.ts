import type { BoardElement } from '@/types/BoardElement'

export type Block = BoardElement & {
  type: BlockType;
}

export enum BlockType {
  NORMAL = 'NORMAL',
}