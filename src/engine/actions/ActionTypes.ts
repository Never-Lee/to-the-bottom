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
    };