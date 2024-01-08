import type { Block } from '@/types/Block'
import type { Position } from '@/types/Position'
import type { Pad } from '@/types/Pad'
import type { TwinBall } from '@/types/TwinBall'

export type Level = {
  blocks: Block[]
  enabled: boolean;
  id: string;
  index?: number;
  name?: string;
  pads: Pad[];
  twin_balls: TwinBall[];
  winning_positions: Position[];
}