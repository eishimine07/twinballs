import type { Level } from '@/types/level'

type LevelService = {
  getLevels: () => Level[];
  getNextLevel: (currentLevel: Level) => Level | null;
}

export default function levelService(): LevelService {
  function getLevels(): Level[] {
    return [
      {
        enabled: true,
        id: 1,
        index: 1,
      },
      {
        enabled: true,
        id: 2,
        index: 2,
      },
      {
        enabled: true,
        id: 3,
        index: 3,
      },
      {
        enabled: false,
        id: 4,
        index: 4,
      },
      {
        enabled: false,
        id: 5,
        index: 5,
      },
      {
        enabled: false,
        id: 6,
        index: 6,
      },
    ]
  } 

  function getNextLevel(currentLevel: Level): Level | null {
    if (!currentLevel.index) {
      return null
    }

    return getLevels().find((level) => (level.index ?? -1) > (currentLevel.index ?? -1)) ?? null
  }

  return { getLevels, getNextLevel }
}