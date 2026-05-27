import type { CardId } from "../cards/CardSchema";
import type { PlayerId } from "../core/GameState";

export type GameEvent =
  | {
      type: "CARD_DRAWN";
      playerId: PlayerId;
      cardId: CardId;
      from: "DECK";
      to: "HAND";
    }
  | {
      type: "CARD_PLAYED";
      playerId: PlayerId;
      cardId: CardId;
      from: "HAND";
      to: "BOARD";
    }
  | {
    type: "CARD_JETTISONED";
    playerId: PlayerId;
    cardId: CardId;
    from: "HAND" | "BOARD";
    to: "WATER";
    pointsGained: number;
  }
  | {
    type: "ACTION_REJECTED";
    playerId: PlayerId;
    reason: string;
  }
  | {
    type: "DRAW_PHASE_SKIPPED";
    reason: string;
  }
| {
    type: "EFFECT_STEP_NOT_IMPLEMENTED";
    effect: string;
  };