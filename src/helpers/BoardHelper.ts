import { BlockType, type Block } from '@/types/Block'

export const BOARD = {
  HEIGHT: 24,
  WIDTH: 28,
  ELEMENT: {
    WIDTH: 2
  }
}

export function getBlocksForBoardEdge(): Block[] {
  const blocks: Block[] = []
  let i = 0
  let j = 0

  while (i < BOARD.WIDTH) {
    j = 0

    while (j < BOARD.HEIGHT) {
      blocks.push({
        type: BlockType.NORMAL,
        position: { x: i, y: j },
      })

      if (i === 0 || i === (BOARD.WIDTH - BOARD.ELEMENT.WIDTH)) {
        j += BOARD.ELEMENT.WIDTH
      } else {
        j = j === (BOARD.HEIGHT - BOARD.ELEMENT.WIDTH) ? BOARD.HEIGHT : BOARD.HEIGHT - BOARD.ELEMENT.WIDTH
      }
    }

    i += BOARD.ELEMENT.WIDTH
  }

  return blocks
}