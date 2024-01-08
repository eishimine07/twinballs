import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Effect, type TwinBall } from '@/types/TwinBall'
import { BlockType, type Block } from '@/types/Block'
import type { Position } from '@/types/Position'
import { PadType, type Pad } from '@/types/Pad'
import { useLevelStore } from './useLevelStore'
import { BOARD, getBlocksForBoardEdge } from '@/helpers/BoardHelper'

enum Movement {
  DOWN,
  LEFT,
  RIGHT,
  UP
}

const STEP = {
  FAST: 2,
  NORMAL: 1,
  REVERSE: -1
}

export const useBoardStore = defineStore('board', () => {
  const levelStore = useLevelStore()
  const levelCompleted = ref<boolean>(false)
  const twinBallOne = ref<TwinBall>({ effect: Effect.NONE, position: { x: 0, y: 0 } })
  const twinBallTwo = ref<TwinBall>({ effect: Effect.NONE, position: { x: 0, y: 0 } })
  const blocks = ref<Block[]>([])
  const pads = ref<Pad[]>([])
  const winningPositions = ref<Position[]>([])
  const boardEdge = getBlocksForBoardEdge()

  function calculateStep(effect: Effect): number {
    switch (effect) {
      case Effect.FAST:
        return STEP.FAST
      case Effect.REVERSE:
        return STEP.REVERSE
      default:
        return STEP.NORMAL
    }
  }

  function calculateNextPosition(twinBall: TwinBall, movement: Movement): Position {
    const calculatedStep = calculateStep(twinBall.effect)
    let nextPosition: Position = { x: 0, y: 0 }

    switch (movement) {
      case Movement.DOWN:
        nextPosition.x = twinBall.position.x
        nextPosition.y = twinBall.position.y + calculatedStep

        break
      case Movement.LEFT:
        nextPosition.x = twinBall.position.x - calculatedStep
        nextPosition.y = twinBall.position.y

        break
      case Movement.RIGHT:
        nextPosition.x = twinBall.position.x + calculatedStep
        nextPosition.y = twinBall.position.y

        break
      case Movement.UP:
        nextPosition.x = twinBall.position.x
        nextPosition.y = twinBall.position.y - calculatedStep

        break
      default:
        nextPosition = twinBall.position

        break
    }

    return nextPosition
  }

  function move(movement: Movement): boolean {
    if (levelCompleted.value) {
      return false
    }

    let stopMovement = false
    const nextPositionResult: Position[] = []

    for (let index = 1; index <= 2; index++) {
      const ball = index === 1 ? twinBallOne.value : twinBallTwo.value
      nextPositionResult[index] = calculateNextPosition(ball, movement)
    }

    nextPositionResult.forEach((nextPosition) => {
      if (hasCollisionWithBlock(nextPosition) || hasCollisionWithBoardEdge(nextPosition)) {
        stopMovement = true

        return
      }
    })

    if (stopMovement) {
      return false
    }

    if (hasCollisionBetweenTwinBalls(nextPositionResult)) {
      return false
    }

    twinBallOne.value.position = nextPositionResult[1]
    twinBallOne.value.effect = getEffect(nextPositionResult[1], twinBallOne.value.effect)
    twinBallTwo.value.position = nextPositionResult[2]
    twinBallTwo.value.effect = getEffect(nextPositionResult[2], twinBallTwo.value.effect)

    return true
  }

  function updateLevelConpleted() {
    if (
      !!winningPositions.value.find(
        (position) =>
          twinBallOne.value.position.x === position.x && twinBallOne.value.position.y === position.y
      ) &&
      !!winningPositions.value.find(
        (position) =>
          twinBallTwo.value.position.x === position.x && twinBallTwo.value.position.y === position.y
      )
    ) {
      levelCompleted.value = true
    }
  }

  function getEffect(position: Position, currentEffect: Effect): Effect {
    const padType = pads.value.find(
      (pad) => pad.position.x === position.x && pad.position.y === position.y
    )?.type

    if (padType == null) {
      return currentEffect
    }

    if (padType === PadType.REVERSE && currentEffect === Effect.REVERSE) {
      return Effect.NONE
    }

    return getEffectByPadType(padType)
  }

  function getEffectByPadType(padType: PadType): Effect {
    switch (padType) {
      case PadType.FAST:
        return Effect.FAST
      case PadType.REVERSE:
        return Effect.REVERSE
      default:
        return Effect.NONE
    }
  }

  function hasCollisionWithBoardEdge(nextPosition: Position): boolean {
    const nexPositionXStart = nextPosition.x
    const nexPositionXEnd = nextPosition.x + BOARD.ELEMENT.WIDTH
    const nexPositionYStart = nextPosition.y
    const nexPositionYEnd = nextPosition.y + BOARD.ELEMENT.WIDTH

    return !!boardEdge.find(({ position }) => {
      const xStart = position.x
      const xEnd = position.x + BOARD.ELEMENT.WIDTH
      const yStart = position.y
      const yEnd = position.y + BOARD.ELEMENT.WIDTH

      return (
        ((xStart <= nexPositionXStart && nexPositionXStart < xEnd) ||
          (xStart < nexPositionXEnd && nexPositionXEnd <= xEnd)) &&
        ((yStart <= nexPositionYStart && nexPositionYStart < yEnd) ||
          (yStart < nexPositionYEnd && nexPositionYEnd <= yEnd))
      )
    })
  }

  function hasCollisionWithBlock(nextPosition: Position): boolean {
    const nexPositionXStart = nextPosition.x
    const nexPositionXEnd = nextPosition.x + BOARD.ELEMENT.WIDTH
    const nexPositionYStart = nextPosition.y
    const nexPositionYEnd = nextPosition.y + BOARD.ELEMENT.WIDTH

    return !!blocks.value
      .filter((block) => block.type === BlockType.NORMAL)
      .find(({ position }) => {
        const xStart = position.x
        const xEnd = position.x + BOARD.ELEMENT.WIDTH
        const yStart = position.y
        const yEnd = position.y + BOARD.ELEMENT.WIDTH

        return (
          ((xStart <= nexPositionXStart && nexPositionXStart < xEnd) ||
            (xStart < nexPositionXEnd && nexPositionXEnd <= xEnd)) &&
          ((yStart <= nexPositionYStart && nexPositionYStart < yEnd) ||
            (yStart < nexPositionYEnd && nexPositionYEnd <= yEnd))
        )
      })
  }

  function hasCollisionBetweenTwinBalls(nextPositions: Position[]): boolean {
    const nextPositionTwinBallOne = nextPositions[1]
    const nextPositionTwinBallTwo = nextPositions[2]

    if (!hasCollision(nextPositionTwinBallOne, twinBallTwo.value.position) && !hasCollision(nextPositionTwinBallTwo, nextPositionTwinBallOne)) {
      return false
    }

    if (!hasCollision(nextPositionTwinBallTwo, twinBallOne.value.position) && !hasCollision(nextPositionTwinBallOne, nextPositionTwinBallTwo)) {
      return false
    }

    return true
  }

  function hasCollision(position1: Position, position2: Position): boolean {
    const position1XStart = position1.x
    const position1XEnd = position1.x + BOARD.ELEMENT.WIDTH
    const position1YStart = position1.y
    const position1YEnd = position1.y + BOARD.ELEMENT.WIDTH
    const position2XStart = position2.x
    const position2XEnd = position2.x + BOARD.ELEMENT.WIDTH
    const position2YStart = position2.y
    const position2YEnd = position2.y + BOARD.ELEMENT.WIDTH

    return (
      ((position2XStart <= position1XStart && position1XStart < position2XEnd) ||
        (position2XStart < position1XEnd && position1XEnd <= position2XEnd)) &&
      ((position2YStart <= position1YStart && position1YStart < position2YEnd) ||
        (position2YStart < position1YEnd && position1YEnd <= position2YEnd))
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
    const initialState = levelStore.getInitialState()

    if (initialState !== null) {
      twinBallOne.value = { ...initialState.twin_balls[0] }
      twinBallTwo.value = { ...initialState.twin_balls[1] }
      blocks.value = [...initialState.blocks]
      pads.value = [...initialState.pads]
      winningPositions.value = [...initialState.winning_positions]
    } else {
      twinBallOne.value = { effect: Effect.NONE, position: { x: 0, y: 0 } }
      twinBallTwo.value = { effect: Effect.NONE, position: { x: 0, y: 0 } }
      blocks.value = []
      pads.value = []
      winningPositions.value = []
    }

    levelCompleted.value = false
  }

  return {
    $reset,
    twinBallOne,
    twinBallTwo,
    blocks,
    levelCompleted,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    pads,
    winningPositions
  }
})
