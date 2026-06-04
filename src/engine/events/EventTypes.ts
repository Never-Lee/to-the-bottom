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
    from: "HAND" | "BOARD" | "DECK";
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
  }
| {
    type: "CARDS_SHUFFLED_INTO_DECK";
    playerId: PlayerId;
    cardIds: CardId[];
  }
| {
    type: "CARDS_READIED";
    playerId: PlayerId;
    cardIds: CardId[];
  }
| {
    type: "TURN_ENDED";
    playerId: PlayerId;
  }
| {
    type: "TURN_STARTED";
    playerId: PlayerId;
  }
  | {
    type: "SINKING_STARTED";
    actorId: PlayerId;
  }
| {
    type: "SINKING_SETUP_COMPLETED";
  }
  | {
    type: "CARD_BOUGHT";
    playerId: PlayerId;
    cardId: CardId;
    from: "SHOP";
    to: "WATER";
    costPaid: number;
  }