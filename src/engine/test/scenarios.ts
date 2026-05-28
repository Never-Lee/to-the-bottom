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
  {
    kind: "action",
    name: "Player draws 3 cards at start of CRUISE",
    state: createTestState({
      P1: {
        deck: [
          "passenger",
          "anchor",
          "fisherman",
        ],
      },
    }),
    action: {
      type: "DRAW_PHASE" as const,
      playerId: "P1" as const,
    },
    expectedEvents: [
      "CARD_DRAWN",
      "CARD_DRAWN",
      "CARD_DRAWN",
    ],
    expectedState: {
      P1: {
        hand: [
          "passenger",
          "anchor",
          "fisherman",
        ],
        deck: [],
      },
    },
  },
{
  kind: "action",
  name: "Fisherman forces player to draw one extra card",
  state: createTestState({
    P1: {
      board: ["fisherman"],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["fisherman"],
      hand: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
      deck: [],
    },
  },
},
{
  kind: "action",
  name: "Anchor prevents drawing during draw phase",
  state: createTestState({
    P1: {
      board: ["anchor"],
      deck: [
        "passenger",
        "fisherman",
        "passenger",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [],
  expectedState: {
    P1: {
      board: ["anchor"],
      hand: [],
      deck: [
        "passenger",
        "fisherman",
        "passenger",
      ],
    },
  },
},
{
  kind: "action",
  name: "Anchor overrides Fisherman draw bonus",
  state: createTestState({
    P1: {
      board: ["anchor", "fisherman"],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [],
  expectedState: {
    P1: {
      board: ["anchor", "fisherman"],
      hand: [],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  },
},
];
