import { createTestState } from "./testUtils";
import type { Scenario } from "./ScenarioTypes";

export const scenarios: Scenario[] = [
  {
   name: "Anchor can jettison itself during action phase",
    kind: "effect",
    state: createTestState({
      P1: {
        board: ["anchor"],
      },
    }),
    effect: {
      cardId: "anchor",
      effectIndex: 1,
      ownerId: "P1" as const,
    },
    expectedEvents: ["CARD_JETTISONED"],
    expectedState: {
      P1: {
        board: [],
        water: ["anchor"],
        points: 0,
      },
    },
  },

  {
    name: "Player can play Passenger by spending points",
    kind: "action",
    state: createTestState({
      P1: {
        hand: ["passenger"],
        points: 1,
      },
    }),
    action: {
      type: "PLAY_CARD" as const,
      playerId: "P1" as const,
      cardId: "passenger",
    },
    expectedEvents: ["CARD_PLAYED"],
    expectedState: {
      P1: {
        board: ["passenger"],
        hand: [],
        points: 0,
      },
    },
  },
];