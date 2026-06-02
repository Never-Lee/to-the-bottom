import type { CardId } from "../cards/CardSchema";

export type PlayerId = "P1" | "P2";

export type PlayerState = {
  id: PlayerId;
  deck: CardId[];
  hand: CardId[];
  board: CardId[];
  water: CardId[];
  exhaustedCards: CardId[];
  points: number;
  
};

export type GameState = {
  players: Record<PlayerId, PlayerState>;
  activePlayerId: PlayerId;
  turnNumber: number;
  chapter: GameChapter;
drawTurnIndex: number;
};

export type GameChapter = "CRUISE" | "SINKING";

export function createInitialGameState(): GameState {
  return {
    activePlayerId: "P1",
    turnNumber: 1,
      chapter: "CRUISE",
  drawTurnIndex: 0,
    players: {
      P1: {
        id: "P1",
        deck: [],
        hand: [],
        board: [],
        water: [],
        exhaustedCards: [],
        points: 0,
      },

      P2: {
        id: "P2",
        deck: [],
        hand: [],
        board: [],
        water: [],
        exhaustedCards: [],
        points: 0,
      },
    },
  };
}