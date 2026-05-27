import type { GameChapter } from "../core/GameState";

export function getBaseDrawCount(
  chapter: GameChapter,
  drawTurnIndex: number
): number {
  if (chapter === "CRUISE") {
    if (drawTurnIndex === 0) {
      return 3;
    }

    if (drawTurnIndex === 1) {
      return 4;
    }

    return 5;
  }

  // SINKING

  if (drawTurnIndex === 0) {
    return 0;
  }

  if (drawTurnIndex === 1) {
    return 1;
  }

  if (drawTurnIndex === 2) {
    return 2;
  }

  return 3;
}