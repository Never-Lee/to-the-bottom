import type { CardId, EffectInput } from "../cards/CardSchema";
import type { PlayerId } from "../core/GameState";

export type GameAction =
  | {
      type: "DRAW_CARD";
      playerId: PlayerId;
    }
  | {
      type: "PLAY_CARD";
      playerId: PlayerId;
      cardId: string;
    }
  | {
      type: "JETTISON_CARD";
      playerId: PlayerId;
      cardId: string;
    }
    | {
    type: "DRAW_PHASE";
    playerId: PlayerId;
  }
  | {
    type: "ACTIVATE_CARD";
    playerId: PlayerId;
    cardId: CardId;
    input?: EffectInput;
  }