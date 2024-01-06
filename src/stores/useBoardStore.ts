import { ref } from 'vue'
import { defineStore } from 'pinia'

const STEP_WIDTH = 16
const BOARD = {
  MAX_HEIGHT: 20,
  MAX_WIDTH: 28,
}

type BoardElement = {
  position: Position;
}

export type Position = {
  x: number;
  y: number;
  x_px: string;
  y_px: string;
}

enum Effect {
  FAST,
  NONE,
  REVERSE,
}

type Ball = BoardElement & {
  effect: Effect;
}

type Pad = BoardElement & {
  effect: Effect;
  type: PadType;
}

type Block = BoardElement & {
  type: BlockType;
}

export enum PadType {
  FAST,
  REVERSE,
  WIN,
}

export enum BlockType {
  NORMAL,
}

enum Movement {
  DOWN,
  LEFT,
  RIGHT,
  UP,
}

const initialWinPositions = [{ x: 24, y: 12 }, { x: 22, y: 16 }]
const initialState = {
  ballOne: { effect: Effect.NONE, position: { x: 4, y: 2, x_px: `${4 * STEP_WIDTH}px` , y_px: `${2 * STEP_WIDTH}px` }},
  ballTwo: { effect: Effect.NONE, position: { x: 2, y: 6, x_px: `${2 * STEP_WIDTH}px` , y_px: `${6 * STEP_WIDTH}px` }},
  winPositions: initialWinPositions,
  pads: [
    { effect: Effect.FAST, type: PadType.FAST, position: { x: 6, y: 10, x_px: `${6 * STEP_WIDTH}px` , y_px: `${10 * STEP_WIDTH}px` }},
    { effect: Effect.REVERSE, type: PadType.REVERSE, position: { x: 10, y: 16, x_px: `${10 * STEP_WIDTH}px` , y_px: `${16 * STEP_WIDTH}px` }},
    { effect: Effect.NONE, type: PadType.WIN, position: { x: initialWinPositions[0].x, y: initialWinPositions[0].y, x_px: `${initialWinPositions[0].x * STEP_WIDTH}px` , y_px: `${initialWinPositions[0].y * STEP_WIDTH}px` }},
    { effect: Effect.NONE, type: PadType.WIN, position: { x: initialWinPositions[1].x, y: initialWinPositions[1].y, x_px: `${initialWinPositions[1].x * STEP_WIDTH}px` , y_px: `${initialWinPositions[1].y * STEP_WIDTH}px` }},
  ],
}

export const useBoardStore = defineStore('board', () => {
  const levelCompleted = ref<boolean>(false)
  const ballOne = ref<Ball>({ effect: Effect.NONE, position: { x: 0, y: 0, x_px: `${0 * STEP_WIDTH}px` , y_px: `${0 * STEP_WIDTH}px` }})
  const ballTwo = ref<Ball>({ effect: Effect.NONE, position: { x: 0, y: 0, x_px: `${0 * STEP_WIDTH}px` , y_px: `${0 * STEP_WIDTH}px` }})
  const blocks: Block[] = getBlocksForBoard(BOARD.MAX_WIDTH, BOARD.MAX_HEIGHT)
  const winPositions: Pick<Position, 'x' | 'y'>[] = initialState.winPositions
  const pads: Pad[] = initialState.pads

  function getBlocksForBoard(width: number, height: number): Block[] {
    const blocks: Block[] = []
    let i = 0
    let j = 0
  
    while (i < width) {
      j = 0
  
      while (j < height) {
        blocks.push({
          type: BlockType.NORMAL,
          position: { x: i, y: j, x_px: `${i * STEP_WIDTH}px` , y_px: `${j * STEP_WIDTH}px` },
        })
  
        if (i === 0 || i === (width - 2)) {
          j += 2
        } else {
          j = j === (height - 2) ? height : height - 2
        }
      }
  
      i += 2
    }

    // Others blocks
    // [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 6 },
    //   { x: 8, y: 4 }, { x: 11, y: 4 }, { x: 12, y: 4 }, { x: 9, y: 5 }, { x: 10, y: 6 }].forEach((block) => {
    //   blocks.push({
    //     type: BlockType.NORMAL,
    //     position: { x: block.x, y: block.y, x_px: `${block.x * STEP_WIDTH}px` , y_px: `${block.y * STEP_WIDTH}px` },
    //   })
    // })

    [{ x: 10, y: 6 }].forEach((block) => {
      blocks.push({
        type: BlockType.NORMAL,
        position: { x: block.x, y: block.y, x_px: `${block.x * STEP_WIDTH}px` , y_px: `${block.y * STEP_WIDTH}px` },
      })
    })

    return blocks
  }

  function calculateStep(effect: Effect): number {
    switch (effect) {
      case Effect.FAST:
        return 2
      case Effect.REVERSE:
        return -1
      default:
        return 1
    }
  }

  function calculateNextPosition(ball: Ball, movement: Movement): Pick<Position, 'x' | 'y'> {
    const calculatedStep = calculateStep(ball.effect)
    let nextPosition: Pick<Position, 'x' | 'y'> = { x: 0, y: 0 }

    switch (movement) {
      case Movement.DOWN:
        nextPosition.x = ball.position.x
        nextPosition.y = ball.position.y + calculatedStep

        break;
      case Movement.LEFT:
        nextPosition.x = ball.position.x - calculatedStep
        nextPosition.y = ball.position.y
      
        break;
      case Movement.RIGHT:
        nextPosition.x = ball.position.x + calculatedStep
        nextPosition.y = ball.position.y
        
        break;
      case Movement.UP:
        nextPosition.x = ball.position.x
        nextPosition.y = ball.position.y - calculatedStep
        
        break;
      default:
        nextPosition = ball.position

        break;
    }

    return nextPosition
  }

  function move(movement: Movement): boolean {
    if (levelCompleted.value) {
      return false
    }

    let stopMovement = false
    const nextPositionResult: Pick<Position, 'x' | 'y'>[] = []

    for (let index = 1; index <= 2; index++) {
      const ball = index === 1 ? ballOne.value : ballTwo.value
      nextPositionResult[index] = calculateNextPosition(ball, movement)
    }

    nextPositionResult.forEach((nextPosition) => {
      if (hasCollisionWithBlock(nextPosition)) {
        stopMovement = true

        return
      }
    })

    if (stopMovement) {
      return false
    }

    if (!hasCollisionWithBall(nextPositionResult[1], ballTwo.value)) {
      ballOne.value.position = {
        ...nextPositionResult[1],
        x_px: `${nextPositionResult[1].x * STEP_WIDTH}px`,
        y_px: `${nextPositionResult[1].y * STEP_WIDTH}px`,
      }

      ballOne.value.effect = getEffect(nextPositionResult[1], ballOne.value.effect)
    }

    if (!hasCollisionWithBall(nextPositionResult[2], ballOne.value)) {
      ballTwo.value.position = {
        ...nextPositionResult[2],
        x_px: `${nextPositionResult[2].x * STEP_WIDTH}px`,
        y_px: `${nextPositionResult[2].y * STEP_WIDTH}px`,
      }

      ballTwo.value.effect = getEffect(nextPositionResult[2], ballTwo.value.effect)
    }

    // if (newPosition.x < 0) {
    //   newPosition.x = 0
    // } else if (newPosition.x > BOARD.MAX_WIDTH) {
    //   newPosition.x = BOARD.MAX_WIDTH
    // }

    // if (newPosition.y < 0) {
    //   newPosition.y = 0
    // } else if (newPosition.y > BOARD.MAX_HEIGHT) {
    //   newPosition.y = BOARD.MAX_HEIGHT
    // }
    return true
  }

  function updateLevelConpleted() {
    if(
      !!winPositions.find((position) => ballOne.value.position.x === position.x && ballOne.value.position.y === position.y)
      && !!winPositions.find((position) => ballTwo.value.position.x === position.x && ballTwo.value.position.y === position.y)
    ) {
      levelCompleted.value = true
    }
  }

  function getEffect(position: Pick<Position, 'x' | 'y'>, currentEffect: Effect): Effect {
    let newEffect = pads.find((pad) => pad.position.x === position.x && pad.position.y === position.y)?.effect

    if (newEffect == null) {
      return currentEffect
    }

    if (newEffect === Effect.REVERSE && currentEffect === Effect.REVERSE) {
      newEffect = Effect.NONE
    }

    return newEffect
  }

  function hasCollisionWithBlock(nextPosition: Pick<Position, 'x' | 'y'>): boolean {
    const nexPositionXStart = nextPosition.x
    const nexPositionXEnd = nextPosition.x + 2
    const nexPositionYStart = nextPosition.y
    const nexPositionYEnd = nextPosition.y + 2

    return !!blocks.filter((block) => block.type === BlockType.NORMAL)
      .find(({ position }) => {
        const xStart = position.x
        const xEnd = position.x + 2
        const yStart = position.y
        const yEnd = position.y + 2

        return (
          ((xStart <= nexPositionXStart && nexPositionXStart < xEnd) || (xStart < nexPositionXEnd && nexPositionXEnd <= xEnd))
          && ((yStart <= nexPositionYStart && nexPositionYStart < yEnd) || (yStart < nexPositionYEnd && nexPositionYEnd <= yEnd))
        )
      })
  }

  function hasCollisionWithBall(nextPosition: Pick<Position, 'x' | 'y'>, otherBall: Ball): boolean {
    const nexPositionXStart = nextPosition.x
    const nexPositionXEnd = nextPosition.x + 2
    const nexPositionYStart = nextPosition.y
    const nexPositionYEnd = nextPosition.y + 2
    const otherBallXStart = otherBall.position.x
    const otherBallXEnd = otherBall.position.x + 2
    const otherBallYStart = otherBall.position.y
    const otherBallYEnd = otherBall.position.y + 2

    return (
      ((otherBallXStart <= nexPositionXStart && nexPositionXStart < otherBallXEnd) || (otherBallXStart < nexPositionXEnd && nexPositionXEnd <= otherBallXEnd))
      && ((otherBallYStart <= nexPositionYStart && nexPositionYStart < otherBallYEnd) || (otherBallYStart < nexPositionYEnd && nexPositionYEnd <= otherBallYEnd))
    )
  }

  // Public methods
  function moveDown() {
    if (move(Movement.DOWN)) {
      updateLevelConpleted()
    }
  }

  function moveLeft() {
    if (move(Movement.LEFT)) {
      updateLevelConpleted()
    }
  }

  function moveRight() {
    if (move(Movement.RIGHT)) {
      updateLevelConpleted()
    }
  }

  function moveUp() {
    if (move(Movement.UP)) {
      updateLevelConpleted()
    }
  }

  function $reset() {
    levelCompleted.value = false
    ballOne.value = { effect: Effect.NONE, position: { x: 4, y: 2, x_px: `${4 * STEP_WIDTH}px` , y_px: `${2 * STEP_WIDTH}px` }}
    ballTwo.value = { effect: Effect.NONE, position: { x: 2, y: 6, x_px: `${2 * STEP_WIDTH}px` , y_px: `${6 * STEP_WIDTH}px` }}
  }

  return { ballOne, ballTwo, blocks, levelCompleted, moveDown, moveLeft, moveRight, moveUp, pads, $reset }
})
