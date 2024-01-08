import { dataToLevel } from '@/helpers/LevelHelper';
import type { Level } from '@/types/Level'
import jsonLevels from '@/levels/default.json' 

export default function levelService() {
  function getLevels(): Level[] {
    return jsonLevels.levels.map((level) => dataToLevel(level))
  }

  function getNextLevel(currentLevel: Pick<Level, 'index'>): Level | null {
    if (!currentLevel.index) {
      return null
    }

    return getLevels().find((level) => level.enabled && ((level.index ?? -1) > (currentLevel.index ?? -1))) ?? null
  }

  return { getLevels, getNextLevel }
}