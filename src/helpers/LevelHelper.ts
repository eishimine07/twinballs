import { BlockType } from '@/types/Block'
import type { Level } from '@/types/Level'
import { PadType } from '@/types/Pad'
import { Effect } from '@/types/TwinBall'

function validatePositionType(position: any, isRequired = true): boolean {
  if (isRequired && position === undefined) {
    return false
  }

  return typeof position.x === 'number' && typeof position.y === 'number'
}

export function dataToLevel(data: any): Level {
  if (typeof data.enabled !== 'boolean') {
    throw new Error('"enabled" must be boolean')
  }

  if (typeof data.id !== 'string') {
    throw new Error('"id" must be string')
  }

  if (!['number', 'undefined'].includes(typeof data.index)) {
    throw new Error('"index" must be undefined or number')
  }

  if (!['string', 'undefined'].includes(typeof data.name)) {
    throw new Error('"name" must be undefined or string')
  }

  if (!Array.isArray(data.blocks)) {
    throw new Error('"blocks" must be array')
  }

  if (!Array.isArray(data.pads)) {
    throw new Error('"pads" must be array')
  }

  if (!Array.isArray(data.twin_balls)) {
    throw new Error('"twin_balls" must be array')
  }

  if (!Array.isArray(data.winning_positions)) {
    throw new Error('"winning_positions" must be array')
  }

  if (
    data.blocks.find((block: any) => {
      return (
        typeof block !== 'object' ||
        !Object.values(BlockType).includes(block.type) ||
        !validatePositionType(block.position)
      )
    })
  ) {
    throw new Error('"blocks" must be a array of Block')
  }

  if (
    data.pads.find((pad: any) => {
      return (
        typeof pad !== 'object' ||
        !Object.values(PadType).includes(pad.type) ||
        !validatePositionType(pad.position)
      )
    })
  ) {
    throw new Error('"pads" must be a array of Pad')
  }

  if (data.twin_balls.length !== 2) {
    throw new Error('"twin_balls" must have length equal to 2')
  }

  if (
    data.twin_balls.find((twin_ball: any) => {
      return (
        typeof twin_ball !== 'object' ||
        !Object.values(Effect).includes(twin_ball.effect) ||
        !validatePositionType(twin_ball.position)
      )
    })
  ) {
    throw new Error('"twin_balls" must be a array of TwinBall')
  }

  if (data.winning_positions.length !== 2) {
    throw new Error('"winning_positions" must have length equal to 2')
  }

  if (
    data.winning_positions.find((winning_position: any) => {
      return typeof winning_position !== 'object' || !validatePositionType(winning_position)
    })
  ) {
    throw new Error('"winning_positions" must be a array of Position')
  }

  return data as Level
}
