import { PadType } from '@/stores/useBoardStore'

export function getUrlByType(type: PadType): string {
  switch (type) {
    case PadType.FAST:
      return '/images/pads/fast.gif'
    case PadType.REVERSE:
      return '/images/pads/reverse.gif'
    case PadType.WIN:
      return '/images/pads/win.gif'
    default:
      return ''
  }
}