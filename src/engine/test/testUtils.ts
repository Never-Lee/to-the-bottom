import type { GameState, PlayerState } from "../core/GameState";

type PartialPlayerState = Partial<Omit<PlayerState, "id">>;

type TestStateConfig = {
  P1?: PartialPlayerState;
  P2?: PartialPlayerState;
    activePlayerId?: "P1" | "P2";
  turnNumber?: number;
  chapter?: "CRUISE" | "SINKING";
  drawTurnIndex?: number;
};

const defaultPlayerState = (id: "P1" | "P2"): PlayerState => ({
  id,
  deck: [],
  hand: [],
  board: [],
  water: [],
  points: 0,
});

export function createTestState(config: TestStateConfig = {}): GameState {
return {
  activePlayerId: config.activePlayerId ?? "P1",
  turnNumber: config.turnNumber ?? 1,
  chapter: config.chapter ?? "CRUISE",
  drawTurnIndex: config.drawTurnIndex ?? 0,
  players: {
      P1: {
        ...defaultPlayerState("P1"),
        ...config.P1,
      },
      P2: {
        ...defaultPlayerState("P2"),
        ...config.P2,
      },
    },
  };
}