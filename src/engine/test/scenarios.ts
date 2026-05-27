import { cards } from "../cards/cards";
import { createTestState } from "./testUtils";

export const scenarios = [
  {
    name: "Anchor skips draw and jettisons itself",
    state: createTestState({
      P1: {
        board: ["anchor"],
      },
    }),
    effect: {
      cardId: "anchor",
      effectIndex: 0,
      ownerId: "P1" as const,
    },
    expectedEvents: ["DRAW_PHASE_SKIPPED", "CARD_JETTISONED"],
    expectedState: {
      P1: {
        board: [],
        water: ["anchor"],
        points: 0,
      },
    },
  },
];

export function getScenarioEffect(scenario: (typeof scenarios)[number]) {
  return cards[scenario.effect.cardId].effects[scenario.effect.effectIndex];
}