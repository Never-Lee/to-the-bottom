import type { CardId } from "../cards/CardSchema";

export type PlayerId = "P1" | "P2";

export type PlayerState = {
  id: PlayerId;
  deck: CardId[];
  hand: CardId[];
  board: CardId[];
  water: CardId[];
  points: number;
};

export type GameState = {
  players: Record<PlayerId, PlayerState>;
  activePlayerId: PlayerId;
  turnNumber: number;
};

export function createInitialGameState(): GameState {
  return {
    activePlayerId: "P1",
    turnNumber: 1,
    players: {
      P1: {
        id: "P1",
        deck: ["passenger"],
        hand: [],
        board: ["anchor"],
        water: [],
        points: 0,
      },
      P2: {
        id: "P2",
        deck: ["passenger"],
        hand: [],
        board: [],
        water: [],
        points: 0,
      },
    },
  };
}