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
    from: "BOARD";
    to: "WATER";
    pointsGained: number;
  }