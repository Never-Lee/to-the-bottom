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
      actorId: "P1" as const,
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
{
  kind: "action",
  name: "Stoker forces player to draw one fewer card",
  state: createTestState({
    P1: {
      board: ["stoker"],
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
  ],
  expectedState: {
    P1: {
      board: ["stoker"],
      hand: [
        "passenger",
        "anchor",
      ],
      deck: [
        "fisherman",
      ],
    },
  },
},
{
  kind: "action",
  name: "Fisherman modifies third CRUISE draw from 5 to 6",
  state: createTestState({
    drawTurnIndex: 2,
    P1: {
      board: ["fisherman"],
      deck: [
        "passenger",
        "anchor",
        "fisherman",
        "stoker",
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
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["fisherman"],
      hand: [
        "passenger",
        "anchor",
        "fisherman",
        "stoker",
        "passenger",
        "anchor",
      ],
      deck: [],
    },
  },
},
{
  kind: "action",
  name: "Captain shuffles selected hand cards into deck and draws same amount",
  state: createTestState({
    P1: {
      board: ["captain"],
      hand: ["passenger", "anchor"],
      deck: ["fisherman", "stoker"],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "captain",
    input: {
      selectedCardIds: ["passenger", "anchor"],
    },
  },
  expectedEvents: [
    "CARDS_SHUFFLED_INTO_DECK",
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["captain"],
      hand: ["fisherman", "stoker"],
      deck: ["passenger", "anchor"],
    },
  },
},
{
  kind: "action",
  name: "Torpedo jettisons opponent deck cards and one card from hand",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: ["passenger"],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
        "captain",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: ["passenger"],
    },
  },
  expectedEvents: [
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
  ],
  expectedState: {
    P1: {
      board: ["torpedo"],
      hand: [],
      water: ["passenger"],
    },
    P2: {
      deck: ["captain"],
      water: [
        "anchor",
        "fisherman",
        "stoker",
      ],
    },
  },
},
{
  kind: "action",
  name: "Torpedo cannot activate without cards in hand",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: [],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: [],
    },
  },
  expectedEvents: [
    "ACTION_REJECTED",
  ],
  expectedState: {
    P1: {
      board: ["torpedo"],
      hand: [],
      water: [],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
      ],
      water: [],
    },
  },
},
{
  kind: "action",
  name: "Torpedo partially resolves when opponent deck has fewer than 3 cards",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: ["passenger"],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: ["passenger"],
    },
  },
  expectedEvents: [
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
  ],
  expectedState: {
    P1: {
      hand: [],
      water: ["passenger"],
    },
    P2: {
      deck: [],
      water: [
        "anchor",
        "fisherman",
      ],
    },
  },
},
];

